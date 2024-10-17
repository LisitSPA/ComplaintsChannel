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
using Application.Chats.Queries.DTOs;
using System.Collections.Generic;


namespace Application.Chats.Queries;

public record GetAllChatsQuery : IRequest<Response<List<ChatDto>>>
{
}


//HANDLER
public class GetAllChatsQueryHandler(
        IRepository<Chat> _repository,
        IMapper _mapper
    ) : IRequestHandler<GetAllChatsQuery, Response<List<ChatDto>>>
{
    public async Task<Response<List<ChatDto>>> Handle(GetAllChatsQuery request, CancellationToken cancellationToken)
    {
        Response<List<ChatDto>> result = new();
        try
        {
            var source = _repository.GetAllActive()
                           .ProjectTo<ChatDto>(_mapper.ConfigurationProvider)
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

