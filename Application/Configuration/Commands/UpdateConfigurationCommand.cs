using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Configuration.Commands.Creates;



public record UpdateConfigurationCommand : IRequest<Response<bool>>
{
    public IFormFile Logo { get; set; }
    public string Color { get; set; }
}

public class UpdateConfigurationCommandHandler : IRequestHandler<UpdateConfigurationCommand, Response<bool>>
{
    private readonly IRepository<Parameters> _repository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IConfiguration _configuration;

    public UpdateConfigurationCommandHandler(IRepository<Parameters> repository, ICurrentUserService currentUserService, IConfiguration configuration)
    {
        _repository = repository;
        _currentUserService = currentUserService;
        _configuration = configuration;
    }
    public async Task<Response<bool>> Handle(UpdateConfigurationCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var configuration = _repository.GetAllActive().Where(x => x.Code == "Logo" || x.Code == "Color");

            if (command.Logo != null)
            {
                var configLogo = configuration.FirstOrDefault(x => x.Code == "Logo");
                if (configLogo != null)
                {
                    configLogo.TextValue = command.Logo.FileName;
                    configLogo.CreatedBy = _currentUserService.UserLoginId;
                    configLogo.CreatedOn = DateTime.Now;
                    _repository.Update(configLogo);
                }
                else
                {
                    configLogo = new Parameters
                    {
                        Code = "Logo",
                        TextValue = command.Logo.FileName,
                        Active = true,
                        CreatedBy = _currentUserService.UserLoginId,
                        CreatedOn = DateTime.Now
                    };
                    _repository.Add(configLogo);
                }

                SaveLogo(command.Logo, configLogo != null);

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
                        Code = "Color",
                        TextValue = command.Color,
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

    private void SaveLogo(IFormFile logo, bool isOverride)
    {
        if (logo == null) return;

        var folderPath = Path.Combine(_configuration["FileRoutes"], "Logo");
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }

        var filePath = Path.Combine(folderPath, logo.FileName);

        if (isOverride && File.Exists(filePath))
            File.Delete(filePath);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            logo.CopyTo(stream);
        }
    }
}

