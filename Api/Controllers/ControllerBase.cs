using Utility.APIResponseHandlers.Wrappers;
using Utility.ServiceErrorHandlers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Application.Translator;
using Microsoft.AspNetCore.Http;
using DevExpress.Office.Utils;
using Newtonsoft.Json;

namespace Api.Controllers
{
    public class ControllerBase: Microsoft.AspNetCore.Mvc.ControllerBase
    {
        public ISender _mediator;
        public ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();

        public IAzureTranslatorService _translatorService;
        public IAzureTranslatorService Translator => _translatorService ??= HttpContext.RequestServices.GetService<IAzureTranslatorService>();

        [ApiExplorerSettingsAttribute(IgnoreApi = true)]
        public IActionResult HandleResult([FromBody]object data, [FromQuery]ErrorServiceProvider errors, string language = "es")
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
                if(language != "es")
                {
                    var translatedData = Translator.Translate(JsonConvert.SerializeObject(data, Formatting.Indented), language).Result;
                    data = JsonConvert.DeserializeObject(translatedData);
                }               

                return Ok(new ApiResponse(data, errors.GetWarnings()));
            }
        }
    }
}