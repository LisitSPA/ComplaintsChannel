using Application.Chats.Commands.Creates;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Commands.Updates;
using Application.Complaints.Queries;
using Domain.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/complaints")]
    public class ComplaintsController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("types/all/{language}", Name = "GetAllComplaintTypes")]
        public async Task<IActionResult> GetAllComplaintTypes(string language)
        {
            var result = await Mediator.Send(new GetAllComplaintTypesQuery { });
            return HandleResult(result.Result, result.ErrorProvider, language);
        }

        [AllowAnonymous]
        [HttpGet("{code}/{language}", Name = "GetComplaintByCode")]
        public async Task<IActionResult> GetComplaintByCode(string code, string language)
        {
            var result = await Mediator.Send(new GetComplaintByCodeQuery { code = code});
            return HandleResult(result.Result, result.ErrorProvider, language);
        }

        [HttpGet("getAll", Name = "GetAllComplaints")]
        public async Task<IActionResult> GetAllComplaints([FromQuery] DataSourceLoadOptions query)
        {
            var result = await Mediator.Send(new GetAllComplaintsQueryDE { Params = query });
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [AllowAnonymous]
        [HttpPost("", Name = "CreateComplaint")]
        public async Task<IActionResult> CreateComplaint(CreateComplaintCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [AllowAnonymous]
        [HttpPost("attachments", Name = "AddAttachments")]
        public async Task<IActionResult> AddAttachments([FromForm]AddAttachmentsCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }
        
        [HttpPost("updateStatus", Name = "UpdateStatusComplaint")]
        public async Task<IActionResult> UpdateComplaint([FromForm] UpdateComplaintStatusCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }
    }
}