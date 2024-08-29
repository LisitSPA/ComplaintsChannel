using Microsoft.AspNetCore.Http;
using RestSharp;

namespace Proxy.Common.Behavior
{
    public static class RestRequestExtensions
    {

        public static RestRequest AddFormFile(this RestRequest request, string paramName, IFormFile formFile)
        {
            if (formFile == null || formFile.Length <= 0)
                throw new Exception("The File is empty.");

            using var fileStream = formFile.OpenReadStream();

            byte[] bytes = new byte[formFile.Length];
            fileStream.Read(bytes, 0, (int)formFile.Length);

            request.AddFile(paramName, bytes, formFile.FileName, formFile.ContentType);

            return request;
        }

    }
}
