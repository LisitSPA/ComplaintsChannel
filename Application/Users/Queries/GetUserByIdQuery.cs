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
using Application.Users.Queries.DTOs;


namespace Application.Users.Queries;

public record GetUserByIdQuery : IRequest<Response<UserDto>>
{
    public int Id { get; init; }
}


//HANDLER
public class GetComplaintByCodeQueryHandler : IRequestHandler<GetUserByIdQuery, Response<UserDto>>
{
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;

    public GetComplaintByCodeQueryHandler(IRepository<User> repo, IMapper mapper)
    {
        _repository = repo;
        _mapper = mapper;
    }

    public async Task<Response<UserDto>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        Response<UserDto> result = new();
        try
        {
            var source = _repository.GetAll()
                            .Where(x => x.Id == request.Id)
                           .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
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

