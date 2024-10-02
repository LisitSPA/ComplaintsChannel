﻿using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using System.Data.Entity;


namespace Application.Users.Queries;

public record GetAllUsersQueryDE : IRequest<Response<LoadResult>>
{
    public DataSourceLoadOptionsBase Params { get; set; }
}


//HANDLER
public class GetAllUsersQueryDEHandler(
    IRepository<User> _repo
    ) : IRequestHandler<GetAllUsersQueryDE, Response<LoadResult>>
{

    public async Task<Response<LoadResult>> Handle(GetAllUsersQueryDE request, CancellationToken cancellationToken)
    {
        Response<LoadResult> result = new();
        try
        {

            var source = _repo.GetAllActive().AsNoTracking().OrderByDescending(x => x.Id);

            var loadResult = await DataSourceLoader.LoadAsync(source, request.Params, cancellationToken);

            result.Result = loadResult;

            return result;

        }
        catch (System.Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }
}

