using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using Application.Dashboard.Queries.DTOs;
using System.Linq.Dynamic.Core;
using System.Linq;
using Domain.Enums;



namespace Application.Dashboard.Queries;

public record GetTotalComplaintsQuery : IRequest<Response<TotalComplaintsDto>>
{
    
}


//HANDLER
public class GetAllDataDashboardQueryHandler(
    IRepository<Complaint> _repo
    ) : IRequestHandler<GetTotalComplaintsQuery, Response<TotalComplaintsDto>>
{

    public async Task<Response<TotalComplaintsDto>> Handle(GetTotalComplaintsQuery request, CancellationToken cancellationToken)
    {
        Response<TotalComplaintsDto> result = new();
        try
        {
            var data = _repo.GetAllActive()
                           .ToList();

            var source = new TotalComplaintsDto
            {
                TotalComplaints = data.Count(),
                ComplaintsInProcess = data.Count(x => x.EStatus > EComplaintStatus.Pending && x.EStatus < EComplaintStatus.Completed),
                PendingComplaints = data.Count(x => x.EStatus == EComplaintStatus.Pending)
            };

            result.Result = source;

            return result;

        }
        catch (System.Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }
}

