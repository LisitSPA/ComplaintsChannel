using RestSharp;

namespace Proxy.Common.Event
{
    public class ProcessErrorClientArgs : EventArgs
    {
        public ProcessErrorClientArgs(RestRequest request, RestResponse response)
        {
            Request = request;
            Response = response;
        }
        public RestRequest Request { get; } // readonly
        public RestResponse Response { get; } // readonly
    }
}
