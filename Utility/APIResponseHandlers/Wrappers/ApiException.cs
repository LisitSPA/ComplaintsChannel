using System.Collections.Generic;

namespace Utility.APIResponseHandlers.Wrappers
{
    public class ApiException : System.Exception
    {
        public int StatusCode { get; set; }

        public IEnumerable<ValidationError> Errors { get; set; }
        public IEnumerable<ValidationError> Warnings { get; set; }

        public string ReferenceErrorCode { get; set; }
        public string ReferenceDocumentLink { get; set; }

        public ApiException(string message,
            int statusCode = 500,
            IEnumerable<ValidationError> errors = null,
            IEnumerable<ValidationError> warnings = null,
            string errorCode = "",
            string refLink = "") :
            base(message)
        {
            this.StatusCode = statusCode;
            this.Errors = errors;
            this.Warnings = warnings;
            this.ReferenceErrorCode = errorCode;
            this.ReferenceDocumentLink = refLink;
        }

        public ApiException(System.Exception ex, int statusCode = 500) : base(ex.Message)
        {
            StatusCode = statusCode;
        }
    }
}