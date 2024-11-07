using Application.Common.Interfaces;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Queries.DTOs;
using Application.Notifications;
using AutoMapper;
using DevExpress.XtraPrinting.Diagnostics;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;
using Utility.PasswordHasher;

namespace Application.Configuration.Commands.Creates;



public record UpdateConfigurationCommand : IRequest<Response<bool>>
{
    public string Logo { get; set; }
    public string Color { get; set; }
}

public class UpdateConfigurationCommandHandler(
        IRepository<Parameters> _repository,
        ICurrentUserService _currentUserService
        ) : IRequestHandler<UpdateConfigurationCommand, Response<bool>>
{
    public async Task<Response<bool>> Handle(UpdateConfigurationCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var configuration = _repository.GetAllActive().Where(x => x.Code == "Logo" || x.Code == "Color");

            if (!string.IsNullOrEmpty(command.Logo))
            {
                var configLogo = configuration.FirstOrDefault(x => x.Code == "Logo");
                if(configLogo != null) 
                {
                    configLogo.TextValue = command.Logo;
                    configLogo.CreatedBy = _currentUserService.UserLoginId;
                    configLogo.CreatedOn = DateTime.Now;
                    _repository.Update(configLogo);
                }
                else
                {
                    configLogo = new Parameters
                    {
                        Code = "Logo",
                        TextValue = command.Logo,
                        Active = true,
                        CreatedBy = _currentUserService.UserLoginId,
                        CreatedOn = DateTime.Now
                    };
                    _repository.Add(configLogo);
                }

            }

            if (!string.IsNullOrEmpty(command.Color))
            {
                var configColor = configuration.FirstOrDefault(x => x.Code == "Color");
                if (configColor != null)
                {
                    configColor.TextValue = command.Color;
                    configColor.CreatedBy = _currentUserService.UserLoginId;
                    configColor.CreatedOn = DateTime.Now;
                    _repository.Update(configColor);
                }
                else
                {
                    configColor = new Parameters
                    {
                        Code = "Logo",
                        TextValue = command.Logo,
                        Active = true,
                        CreatedBy = _currentUserService.UserLoginId,
                        CreatedOn = DateTime.Now
                    };
                    _repository.Add(configColor);
                }
            }

            result.Result = _repository.Save();

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

} 

