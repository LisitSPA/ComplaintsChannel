using Application.Configuration.Commands.Creates;
using Application.Configuration.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/configuration")]
    public class ConfigurationController : ControllerBase
    {

        [HttpGet("getAll", Name = "GetAllConfiguration")]
        public async Task<IActionResult> GetAllConfiguration()
        {
            var result = await Mediator.Send(new GetConfiguration {});
            return HandleResult(result.Result, result.ErrorProvider);
        }
                
        [HttpPost("", Name = "SaveConfiguration")]
        public async Task<IActionResult> SaveConfiguration([FromForm] UpdateConfigurationCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }
    }
}