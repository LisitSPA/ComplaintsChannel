using Proxy.Common.Event;
using RestSharp;
using RestSharp.Authenticators;


namespace Proxy.Rest
{
    public class BaseClient :  IDisposable
    {
        public readonly RestClient baseClient;
        readonly string _baseUrl;
        private readonly AuthenticatorBase? _authenticator;
        public event ProcessErrorClient? ProcessErrorAsync;

        public BaseClient(string baseUrl, AuthenticatorBase? authenticator = null)
        {
            _baseUrl = baseUrl;
            _authenticator = authenticator;
            baseClient = BuildClient();
        }

        public delegate Task ProcessErrorClient(ProcessErrorClientArgs args);

        protected RestClient BuildClient()
        {
            var options = new RestClientOptions(_baseUrl);

            if (_authenticator != null)
                options.Authenticator = _authenticator;

            var client = new RestClient(options);
            
            return client;
        }

        public async Task<RestResponse> ExecutComplaintync(RestRequest request, CancellationToken cancellationToken = default)
        {
            return await ExecuteNativComplaintync<object>(request, cancellationToken);
        }

        public async Task<TRespone> ExecutComplaintync<TRespone>(RestRequest request, CancellationToken cancellationToken = default)
        {
            return (await ExecuteNativComplaintync<TRespone>(request, cancellationToken)).Data; 
        }

        private async Task<RestResponse<TRespone>> ExecuteNativComplaintync<TRespone>(RestRequest request, CancellationToken cancellationToken)
        {
            if (baseClient == null)
                throw new Exception("Client cannot be null.");

            var response = await baseClient.ExecuteAsync<TRespone>(request,cancellationToken);

            BuildLog(request, response);

            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                if (ProcessErrorAsync == null)
                    ProcessErrorAsync += ErrorHandler;

                await ProcessErrorAsync(new ProcessErrorClientArgs(request, response));
            }

            return response;
        }

        protected static Task ErrorHandler(ProcessErrorClientArgs args)
        {
            throw new Exception($" StatusCode: {(int)args.Response.StatusCode} {args.Response.StatusCode} Error: {args.Response.ErrorMessage}.");
        }

        //TODO: Implement.
        private static void BuildLog(RestRequest request, RestResponse response) { }

        public void Dispose()
        {
            baseClient?.Dispose();
            //It's informing the Garbage Collector (GC)
            //that this object was cleaned up fully.
            GC.SuppressFinalize(this);
        }
    }
    
}
