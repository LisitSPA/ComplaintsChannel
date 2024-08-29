using Utility.ServiceErrorHandlers;

namespace Utility.DTOs
{
    public interface IResponse<out T>
    {
        T Result { get; }
        ErrorServiceProvider ErrorProvider { get; set; }
    }
}