using Utility.APIResponseHandlers.Wrappers;
using Utility.ServiceErrorHandlers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Controllers
{
    public class ComplaintControllerBase: ControllerBase
    {
        public ISender _mediator;
        public ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();

        [ApiExplorerSettingsAttribute(IgnoreApi = true)]
        public IActionResult HandleResult([FromBody]object data, [FromQuery]ErrorServiceProvider errors)
        {           
            if(errors.HasError())
            {
                return BadRequest(new
                    ApiResponse(null,
                        errors.GetWarnings(),
                        409,
                        ResponseMessageEnum.Failure,
                        errors.GetErrors()
                    ));
            }
            if (data == null && errors.HasWarning())
            {
                return Ok(new ApiResponse(data, errors.GetWarnings(), 204, ResponseMessageEnum.Warning));
            }
            else
            {
                return Ok(new ApiResponse(data, errors.GetWarnings()));
            }
        }
    }
}