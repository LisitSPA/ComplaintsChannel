using Application.Common.Interfaces;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Queries.DTOs;
using Application.Notifications;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Users.Commands.Deletions;



public record DeleteUserCommand : IRequest<Response<bool>>
{
    public int Id { get; set; }
    public bool Active { get; set; }

}

public class DeleteUserCommandHandler(
        IRepository<User> _repository,
        ICurrentUserService _currentUserSvc,
        IRepository<Complaint> _complaintRepo,
        IMediator _mediator,
        IMapper _mapper
        ) : IRequestHandler<DeleteUserCommand, Response<bool>>
{
    public async Task<Response<bool>> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var user = _repository.GetAll().First(x => x.Id == x.Id);
            user.Deleted = true;
            user.Active = false;
                           
            _repository.Update(user);
          
            result.Result = _repository.Save();

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

} 

