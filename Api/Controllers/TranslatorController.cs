using Application.Complaints.Commands.Creates;
using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [ApiController]
    [Route("api/translator")]
    public class TranslatorController : ControllerBase
    {
        [HttpPost("TranslateText", Name = "TranslateText")]
        public async Task<IActionResult> TranslateText(TranslateTextCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

       
    }
}