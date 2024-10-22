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

namespace Application.Users.Commands.Updates;



public record UpdateUserCommand : IRequest<Response<bool>>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public EUserType EUserType { get; set; }
    public EGenre EGenre { get; set; }
    public ECompanyStatus Status { get; set; }
    public string Email { get; set; }

}

public class UpdateUserCommandHandler(
        IRepository<User> _repository,
        ICurrentUserService _currentUserSvc,
        IRepository<Complaint> _complaintRepo,
        IMediator _mediator,
        IMapper _mapper
        ) : IRequestHandler<UpdateUserCommand, Response<bool>>
{
    public async Task<Response<bool>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var user = _repository.GetAll().First(x => x.Id == command.Id);

            if(command.Email != null)
            {
                var exists = _repository.GetAll().FirstOrDefault(x => x.ContactEmail == command.Email && x.Id != command.Id);
                if (exists != null)
                    throw new Exception("El correo ya existe");
            }

            user.Names = command.Name;
            user.EUserType = command.EUserType;
            user.ECompanyStatus = command.Status;
            user.ContactEmail = command.Email;
            user.EGenre = command.EGenre;                      
                           
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

