using System;
using Application.Users.Queries.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Issuer"];

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

        public static string GenerateToken(UserLoginDto user, IConfiguration _config)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Names),
                    new Claim("LastName", user.LastName),
                    new Claim(ClaimTypes.Role, user.EUserType.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"]
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }


}