using Proxy.Common.Event;
using Newtonsoft.Json;
using Domain.Common;
using System.Net;

namespace Proxy.Common.EventHandler
{

    public static class ExternalResponseErrorHandler
    {
        /// <summary>
        /// this handler applies only to microservices that 
        /// provide a response of type <paramref name="ExternalResponse"/> . 
        /// </summary>
        public static Task ErrorHandler(ProcessErrorClientArgs args)
        {
            var response = args.Response;

            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                if (response.Content != null)
                {
                    var externalResponse = 
                        JsonConvert.DeserializeObject<ExternalResponse<dynamic>>(response.Content);

                    if (externalResponse != null && externalResponse.ErrorList.Count > 0)
                    {
                        var errors = string.Join(", ", externalResponse.ErrorList.Select(x => x.Value));

                        throw new Exception(errors);
                    }
                }
            }


            throw response.StatusCode switch
            {
                0 => new Exception("Timeout exception"),
                HttpStatusCode.Forbidden or HttpStatusCode.Unauthorized => new Exception("Unauthorized"),
                _ => new Exception($"{args.Response.StatusCode} {args.Response.ErrorException?.Message}"),
            };
        }
    }
}
