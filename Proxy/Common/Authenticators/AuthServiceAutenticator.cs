using Microsoft.Extensions.Configuration;
using RestSharp;
using RestSharp.Authenticators;

namespace Proxy.Common.Authenticators
{
    internal class AuthServiceAutenticator : AuthenticatorBase
    {
        private readonly IConfiguration _config;

        public AuthServiceAutenticator(IConfiguration config)
            : base(config["KV-DefaultTokenAttachment"])
        {
            _config = config;
        }

        protected override async ValueTask<Parameter> GetAuthenticationParameter(string accessToken)
        {
            Token = string.IsNullOrEmpty(Token) ? await GetToken() : Token;

            return new HeaderParameter(KnownHeaders.Authorization, $"Bearer {Token}");
        }


        private Task<string> GetToken()
        {
            return Task.FromResult(_config["KV-DefaultToken"]);
        }
    }
}
