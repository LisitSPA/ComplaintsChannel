using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Utility.APIResponseHandlers.Wrappers;
using Utility.Convertions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Utility.APIResponseHandlers
{
    public class ApiResponseMiddleware
    {
        private readonly RequestDelegate _next;     
       

        public ApiResponseMiddleware(RequestDelegate next)
        {
            _next = next;         
           
        }

        public async Task Invoke(HttpContext context)
        {
            if (IsSwagger(context) || IsSse(context))
            {
                await this._next(context);
            }          
            else
            {
                var originalBodyStream = context.Response.Body;

                using (var responseBody = new MemoryStream())
                {
                    context.Response.Body = responseBody;

                    try
                    {
                        await _next.Invoke(context);
                    }
                    catch (System.Exception ex)
                    {
                        await HandleExceptionAsync(context, ex);
                    }
                    finally
                    {
                        responseBody.Seek(0, SeekOrigin.Begin);
                        await responseBody.CopyToAsync(originalBodyStream);
                    }
                }
            }

        }

        private static Task HandleExceptionAsync(HttpContext context, System.Exception exception)
        {
            ApiError apiError = null;
            ApiResponse apiResponse = null;
            int code = 0;

            if (exception is ApiException)
            {
                var ex = exception as ApiException;
                apiError = new ApiError(ex.Message);
                apiError.Errors = ex.Errors;
                apiError.ReferenceErrorCode = ex.ReferenceErrorCode;
                apiError.ReferenceDocumentLink = ex.ReferenceDocumentLink;
                code = ex.StatusCode;
                context.Response.StatusCode = code;

            }
            else if (exception is UnauthorizedAccessException)
            {
                apiError = new ApiError("Unauthorized Access");
                code = (int)HttpStatusCode.Unauthorized;
                context.Response.StatusCode = code;
            }
            else if (exception is ValidationException)
            {
                var ex = exception as ValidationException;
                apiError = new ApiError(ex.Errors) ;
                apiError.ExceptionMessage = ex.Message;
                apiError.ValidationErrors = ex.Errors;
                code = 400;
                context.Response.StatusCode = code;
            }
            else
            {
#if !DEBUG
                var msg = "An unhandled error occurred.";
                string stack = null;
#else
                var msg = exception.GetBaseException().Message;
                string stack = exception.StackTrace;
#endif

                apiError = new ApiError(msg);
                apiError.Details = stack;
                code = (int)HttpStatusCode.InternalServerError;
                context.Response.StatusCode = code;
            }

            context.Response.ContentType = "application/json";

            apiResponse = new ApiResponse(null, null, code, ResponseMessageEnum.Exception, null, apiError);



            var json = JsonConvert.SerializeObject(apiResponse);

            return context.Response.WriteAsync(json);
        }

        private static Task HandleNotSuccessRequestAsync(HttpContext context, int code)
        {
            context.Response.ContentType = "application/json";

            ApiError apiError = null;
            ApiResponse apiResponse = null;

            if (code == (int)HttpStatusCode.NotFound)
            {
                apiError = new ApiError("The specified URI does not exist. PlComplainte verify and try again.");
            }
            else if (code == (int)HttpStatusCode.NoContent)
            {
                apiError = new ApiError("The specified URI does not contain any content.");
            }
            else
            {
                apiError = new ApiError("Your request cannot be processed. PlComplainte contact a support.");
            }

            apiResponse = new ApiResponse(null, null, code, ResponseMessageEnum.Failure, null, apiError);
            context.Response.StatusCode = code;

            var json = JsonConvert.SerializeObject(apiResponse);
                        
            return context.Response.WriteAsync(json);
        }

        private static Task HandleSuccessRequestAsync(HttpContext context, object body, int code)
        {
            //context.Response.ContentType = "application/json";
            //string jsonString, bodyText = string.Empty;
            //ApiResponse apiResponse = null;


            //if (!body.ToString().IsValidJson())
            //    bodyText = JsonConvert.SerializeObject(body);
            //else
            //    bodyText = body.ToString();

            //dynamic bodyContent = JsonConvert.DeserializeObject<dynamic>(bodyText);
            //Type type;

            //type = bodyContent?.GetType();

            //if (type.Equals(typeof(Newtonsoft.Json.Linq.JObject)))
            //{
            //    apiResponse = JsonConvert.DeserializeObject<ApiResponse>(bodyText);
            //    if (apiResponse.StatusCode != code)
            //        jsonString = JsonConvert.SerializeObject(apiResponse);
            //    else if (apiResponse.Content != null)
            //        jsonString = JsonConvert.SerializeObject(apiResponse);
            //    else
            //    {
            //        apiResponse = new ApiResponse(bodyContent,null, code, ResponseMessageEnum.Success, null);
            //        jsonString = JsonConvert.SerializeObject(apiResponse);
            //    }
            //}
            //else
            //{
            //    apiResponse = new ApiResponse(bodyContent, null, code, ResponseMessageEnum.Success, bodyContent, null);
            //    jsonString = JsonConvert.SerializeObject(apiResponse);
            //}

            //return context.Response.WritComplaintync(jsonString);
            return null;
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            var plainBodyText = await new StreamReader(response.Body).ReadToEndAsync();
            response.Body.Seek(0, SeekOrigin.Begin);

            return plainBodyText;
        }

        private bool IsSwagger(HttpContext context)
        {
            return context.Request.Path.StartsWithSegments("/docs");

        }
        private bool IsSse(HttpContext context)
        {
            return context.Request.Path.StartsWithSegments("/stream-adboard") || 
                   context.Request.Path.StartsWithSegments("/stream-map");

        }

        private int GetFboId(HttpContext context)
        {
            var host = context.Request.Host.Value;

            var claims = (context.User.Identity as ClaimsIdentity);

            if (claims.Claims.Count() != 0)
            {
                try
                {
                    return Parse.Int((context.User.Identity as ClaimsIdentity).FindFirst("fbo").Value);
                }
                catch (Exception)
                {
                    return 0;
                }

            }
            return 0;
        }

    }

}