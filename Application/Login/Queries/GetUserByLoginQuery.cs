using Application.Common.Interfaces;
using Application.Complaints.Commands.Creates;
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
using Utility.PasswordHasher;

namespace Application.Users.Queries;

public record GetUserByLoginQuery : IRequest<Response<UserLoginDto>>
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class GetUserByLoginQueryHandler : IRequestHandler<GetUserByLoginQuery, Response<UserLoginDto>>
{
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasherService _passwordHasher;

    public GetUserByLoginQueryHandler(
        IRepository<User> repository,
        IPasswordHasherService passwordHasherService,
        IMapper mapper
        )
    {
        _repository = repository;
        _mapper = mapper;
        _passwordHasher = passwordHasherService;
    }

    public async Task<Response<UserLoginDto>> Handle(GetUserByLoginQuery command, CancellationToken cancellationToken)
    {
        Response<UserLoginDto> result = new();
        try
        {
            var user = _repository.GetAllActive()
                 .Where(x => x.UserName == command.Username)
                 .ProjectTo<UserLoginDto>(_mapper.ConfigurationProvider)
                 .FirstOrDefault();

           
            result.Result = user;
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

    
   



}



