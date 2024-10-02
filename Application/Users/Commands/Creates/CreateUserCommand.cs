﻿using Application.Common.Interfaces;
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

namespace Application.Users.Commands.Creates;



public record CreateUserCommand : IRequest<Response<bool>>
{
    public string Name { get; set; }
    public EUserType EUserType { get; set; }
    public EGenre EGenre { get; set; }
    public bool Active { get; set; }
    public string Email { get; set; }

}

public class CreateUserCommandHandler(
        IRepository<User> _repository,
        ICurrentUserService _currentUserSvc,
        IRepository<Complaint> _complaintRepo,
        IMediator _mediator,
        IMapper _mapper
        ) : IRequestHandler<CreateUserCommand, Response<bool>>
{
    public async Task<Response<bool>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var exists = _repository.GetAll().FirstOrDefault(x => command.Email != null && x.ContactEmail == command.Email && x.Deleted != true);
            if (exists != null)
                throw new Exception("El usuario ya existe");

            var user = new User
            {
                Names = command.Name,
                EUserType = command.EUserType,
                Active = command.Active,
                ContactEmail = command.Email,
                EGenre = command.EGenre,
            };            
                           
            _repository.Add(user);
          
            result.Result = _repository.Save();

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

} 

