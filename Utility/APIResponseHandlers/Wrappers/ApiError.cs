using System.Collections.Generic;

namespace Utility.APIResponseHandlers.Wrappers
{
    public class ApiError
    {
        public bool IsError { get; set; }
        public string ExceptionMessage { get; set; }
        public string Details { get; set; }
        public string ReferenceErrorCode { get; set; }
        public string ReferenceDocumentLink { get; set; }
        public IEnumerable<ValidationError> Errors  { get; set; }
        public IDictionary<string, string[]> ValidationErrors { get; set; }
        
        public ApiError(string message)
        {
            this.ExceptionMessage = message;
            this.IsError = true;
        }
        
        public ApiError(IDictionary<string, string[]> failures)
        {
            this.IsError = true;
            this.ValidationErrors = failures;
        }
    }
  
}