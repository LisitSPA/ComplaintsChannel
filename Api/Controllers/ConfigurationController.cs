using Application.Configuration.Commands.Creates;
using Application.Configuration.Queries;
using Application.Users.Commands;
using Application.Users.Commands.Creates;
using Application.Users.Commands.Deletions;
using Application.Users.Commands.Updates;
using Application.Users.Queries;
using Domain.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/configuration")]
    public class ConfigurationController : ControllerBase
    {

        [HttpGet("", Name = "GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetConfiguration {});
            return HandleResult(result.Result, result.ErrorProvider);
        }
                
        [HttpPost("", Name = "SaveConfiguration")]
        public async Task<IActionResult> SaveConfiguration(UpdateConfigurationCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

    }
}