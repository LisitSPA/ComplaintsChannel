using Utility.ServiceErrorHandlers;
using System;

namespace Utility.DTOs
{
    public class Response<T> :IResponse<T>
    {
        public Response()
        {
            ErrorProvider = new();
        }
        public T Result { get; set; }
        public ErrorServiceProvider ErrorProvider { get; set; }

        public static implicit operator Response<T>(bool v)
        {
            throw new NotImplementedException();
        }
    }
}