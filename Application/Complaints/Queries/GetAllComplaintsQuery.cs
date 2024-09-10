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


namespace Application.Queries;

public record GetAllComplaintsQuery : IRequest<Response<ComplaintDto>>
{
    public int Id { get; init; }
}


//HANDLER
public class GetAllComplaintsQueryHandler : IRequestHandler<GetAllComplaintsQuery, Response<ComplaintDto>>
{
    private readonly IRepository<Complaint> _repo;
    private readonly IMapper _mapper;

    public GetAllComplaintsQueryHandler(IRepository<Complaint> repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<Response<ComplaintDto>> Handle(GetAllComplaintsQuery request, CancellationToken cancellationToken)
    {
        Response<ComplaintDto> result = new();
        try
        {

            //var source = await _repo.GetAll()
            //               .ProjectTo<ComplaintsDto>(_mapper.ConfigurationProvider)
            //               .ToList();


            //result.Result = source;

            return result;

        }
        catch (System.Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }
}

