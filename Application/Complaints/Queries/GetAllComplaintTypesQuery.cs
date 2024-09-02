using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using Application.Queries.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;


namespace Application.Queries;

public record GetAllComplaintTypesQuery : IRequest<Response<List<ComplaintTypeDto>>>
{
    public int Id { get; init; }
}


//HANDLER
public class GetAllComplaintTypesQueryHandler : IRequestHandler<GetAllComplaintTypesQuery, Response<List<ComplaintTypeDto>>>
{
    private readonly IRepository<ComplaintType> _repo;
    private readonly IMapper _mapper;

    public GetAllComplaintTypesQueryHandler(IRepository<ComplaintType> repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<Response<List<ComplaintTypeDto>>> Handle(GetAllComplaintTypesQuery request, CancellationToken cancellationToken)
    {
        Response<List<ComplaintTypeDto>> result = new();
        try
        {

            var source = _repo.GetAllActive()
                           .ProjectTo<ComplaintTypeDto>(_mapper.ConfigurationProvider)
                           .ToList();

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

