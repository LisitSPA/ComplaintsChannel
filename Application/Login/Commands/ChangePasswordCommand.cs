using Application.Common.Interfaces;
using Application.Complaints.Commands.Creates;
using Application.Notifications;
using Application.Users.Queries.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;
using Utility.Extensions;
using Utility.PasswordHasher;

namespace Application.Users.Commands;

public record ChangePasswordCommand : IRequest<Response<bool>>
{
    public string Username { get; set; }
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
}

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Response<bool>>
{
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasherService _passwordHasher;

    public ChangePasswordCommandHandler(
        IRepository<User> repository,
        IPasswordHasherService passwordHasherService,
        IMapper mapper
        )
    {
        _repository = repository;
        _mapper = mapper;
        _passwordHasher = passwordHasherService;
    }

    public async Task<Response<bool>> Handle(ChangePasswordCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var user = _repository.GetAllActive()
                 .FirstOrDefault(x => x.UserName == command.Username);

            if (user is not null && _passwordHasher.VerifyPassword(command.OldPassword, user?.Password))
            {
                user.Password = _passwordHasher.HashPassword(command.NewPassword);
                user.ChangePassword = false;

                _repository.Update(user);
                _repository.Save();
            }
             
            result.Result = true;

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

    
   



}



