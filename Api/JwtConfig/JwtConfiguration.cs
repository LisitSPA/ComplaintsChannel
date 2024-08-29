using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Api.JwtConfig
{
    public class JwtConfiguration
    {
        public static void InitConfig(IServiceCollection services, IConfiguration config, SymmetricSecurityKey secretKey)
        {
            // Get options from app setting
            var issuer = config.GetValue<string>(TokenOptions.Issuer);
            var audience = config.GetValue<string>(TokenOptions.Audience);

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = issuer;
                options.Audience = audience;
                options.SigningCredentials = new SigningCredentials(secretKey, algorithm: SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = issuer,

                ValidateAudience = true,
                ValidAudience = audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = secretKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = issuer;
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
                configureOptions.IncludeErrorDetails = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                // Roles
                options.AddPolicy("User", policy => policy.RequireClaim("rol", "user"));
                options.AddPolicy("Administrator", policy => policy.RequireClaim("rol", "administrator"));

                // Application Modules
                options.AddPolicy("Dashboard", policy => policy.RequireClaim("Dashboard", "True"));

            });

        }
 
    }

    public static class TokenOptions
    {
        public const string Issuer = "KV-JwtIssuerOptions-Issuer";
        public const string Audience = "KV-JwtIssuerOptions-Audience";
        public const string SecretKey = "KV-JwtIssuerOptions-SecretKey";
    }
}