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

public record GetChatByUserQuery : IRequest<Response<List<ChatDto>>>
{
    public int UserId { get; init; }
}


//HANDLER
public class GetChatByUserQueryHandler(
        IRepository<Chat> _repository,
        IMapper _mapper
    ) : IRequestHandler<GetChatByUserQuery, Response<List<ChatDto>>>
{
    public async Task<Response<List<ChatDto>>> Handle(GetChatByUserQuery request, CancellationToken cancellationToken)
    {
        Response<List<ChatDto>> result = new();
        try
        {
            var source = _repository.GetAll()
                            .Where(x => x.CreatedBy == request.UserId)
                           .ProjectTo<List<ChatDto>>(_mapper.ConfigurationProvider)
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

