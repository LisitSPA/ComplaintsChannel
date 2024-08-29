using System.Collections.Generic;
using System.Linq;
using Utility.APIResponseHandlers.Wrappers;
using Utility.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Dependencies
{
    public class ValidationActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var modelState = context.ModelState;
            if (!modelState.IsValid)
            {
                List<MessageDto> errorList = new List<MessageDto>(); 
                //     var errors = new JObject();
            
                foreach (var key in modelState.Keys)
                {
                    var state = modelState[key];
                    if (state.Errors.Any())
                    {
                        MessageDto message = new MessageDto();

                        message.Code = key;
                        message.Message = state.Errors.First().ErrorMessage;

                        errorList.Add(message);

                    }
                }

                ApiResponse errorResponse = new ApiResponse()
                {
                    Success = false,
                    ErrorList = errorList
                };


                context.Result = new BadRequestObjectResult(errorResponse);
            }
        }
    }

}