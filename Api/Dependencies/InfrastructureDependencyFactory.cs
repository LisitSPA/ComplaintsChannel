using Application.Common.Interfaces;
using Utility.ServiceErrorHandlers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Api.Services;

namespace Api.Dependencies
{
    public static class InfrastructureDependencyFactory
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IErrorServiceProvider, ErrorServiceProvider>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ValidationActionFilter>();
        }

    }
}