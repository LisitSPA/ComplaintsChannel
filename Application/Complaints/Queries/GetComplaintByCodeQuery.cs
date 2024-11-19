using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Application.Complaints.Queries.DTOs;
using Microsoft.EntityFrameworkCore;


namespace Application.Complaints.Queries;

public record GetComplaintByCodeQuery : IRequest<Response<ComplaintDto>>
{
    public string code { get; init; }
}


//HANDLER
public class GetComplaintByCodeQueryHandler : IRequestHandler<GetComplaintByCodeQuery, Response<ComplaintDto>>
{
    private readonly IRepository<Complaint> _repository;
    private readonly IMapper _mapper;

    public GetComplaintByCodeQueryHandler(IRepository<Complaint> repo, IMapper mapper)
    {
        _repository = repo;
        _mapper = mapper;
    }

    public async Task<Response<ComplaintDto>> Handle(GetComplaintByCodeQuery request, CancellationToken cancellationToken)
    {
        Response<ComplaintDto> result = new();
        try
        {
            var source = _repository.GetAll()
                            .Include(x => x.Complainant)
                            .Include(x => x.Attachments)
                            .Include(x => x.ComplaintInvolved)
                            .Include(x => x.ComplaintHistory.OrderByDescending(ch => ch.Id))
                            .Include(x => x.ComplaintReasons)
                            .Where(x => x.TrackingCode == request.code)
                           .ProjectTo<ComplaintDto>(_mapper.ConfigurationProvider)
                           .FirstOrDefault();

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

