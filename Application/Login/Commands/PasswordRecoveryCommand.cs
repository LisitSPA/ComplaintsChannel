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

public class PasswordRecoveryCommandHandler
    (
        IRepository<User> _repository,
        IPasswordHasherService _passwordHasher,
        IMapper _mapper,
        IEmailNotificationService _emailNotificationService
        ) 
    : IRequestHandler<PasswordRecoveryCommand, Response<bool>>
{
   
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

                _emailNotificationService.SendEmail(new EmailNotification
                {
                    Subject = "Recuperar contraseña",
                    Body = new Dictionary<string, string> {
                        { "TITLE", "Contraseña recuperada exitosamente" },
                        { "TEXT", $"Ingresa con la siguiente contraseña temporal: <br><br> {tempPass}  <br><br>Te solicitará cambio al ingresar." }
                    },
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



