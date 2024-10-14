using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using Application.Dashboard.Queries.DTOs;
using System.Linq.Dynamic.Core;
using System.Linq;



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

            var source = _repo.GetAllActive()
                           .GroupBy(x => x.Id)
                          .Select(x => new TotalComplaintsDto
                          { 
                                TotalComplaints = x.Count(),
                                ComplaintsInProcess = x.Count(x => x.EStatus == Domain.Enums.EComplaintStatus.InProcess),
                                PendingComplaints = x.Count(x => x.EStatus == Domain.Enums.EComplaintStatus.Pending)
                           })
                          .First();


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

