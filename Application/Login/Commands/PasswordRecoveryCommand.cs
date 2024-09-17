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

public record PasswordRecoveryCommand : IRequest<Response<bool>>
{
    public string Username { get; set; }
}

public class PasswordRecoveryCommandHandler : IRequestHandler<PasswordRecoveryCommand, Response<bool>>
{
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasherService _passwordHasher;

    public PasswordRecoveryCommandHandler(
        IRepository<User> repository,
        IPasswordHasherService passwordHasherService,
        IMapper mapper
        )
    {
        _repository = repository;
        _mapper = mapper;
        _passwordHasher = passwordHasherService;
    }

    public async Task<Response<bool>> Handle(PasswordRecoveryCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var user = _repository.GetAllActive()
                 .FirstOrDefault(x => x.UserName == command.Username);

            if (user is not null)
            {
                var tempPass = RandomStringGenerator.GenerateRandomString(8);
                user.Password = _passwordHasher.HashPassword(tempPass);
                user.ChangePassword = true;

                _repository.Update(user);
                _repository.Save();

                EmailNotificationService.SendEmail(new EmailNotification
                {
                    Subject = "Recuperar contraseña",
                    Body = $"Tu contraseña temporal es: {tempPass}",
                    ToEmail = user.ContactEmail
                });
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



