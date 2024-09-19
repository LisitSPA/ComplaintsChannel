using Application.Complaints.Commands.Creates;
using Application.Complaints.Queries;
using Application.Dashboard.Queries;
using Application.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {

        [HttpGet("countComplaints", Name = "GetCountComplaints")]
        public async Task<IActionResult> GetCountComplaints()
        {
            var result = await Mediator.Send(new GetTotalComplaintsQuery { });
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpGet("chartByArea", Name = "GetChartByArea")]
        public async Task<IActionResult> GetChartByArea()
        {
            var result = await Mediator.Send(new GetChartByAreaQuery { });
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpGet("chartByPosition", Name = "GetChartByPosition")]
        public async Task<IActionResult> GetChartByPosition()
        {
            var result = await Mediator.Send(new GetChartByAreaQuery { });
            return HandleResult(result.Result, result.ErrorProvider);
        }

    }
}