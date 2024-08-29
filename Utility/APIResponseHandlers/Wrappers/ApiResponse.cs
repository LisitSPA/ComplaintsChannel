using Utility.DTOs;
using Utility.Extensions;
using System.Collections.Generic;
using System.Runtime.Serialization;


namespace Utility.APIResponseHandlers.Wrappers
{
    [DataContract]
    public class ApiResponse
    {
        [DataMember]
        public string Version { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int StatusCode { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Message { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public ApiError ResponseException { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public object Content { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public List<MessageDto> ErrorList { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public List<MessageDto> WarningList { get; set; }

        public bool Success { get; set; } = true;

        public ApiResponse() { }

        public ApiResponse(
            object content = null,
            List<MessageDto> warnings = null,
            int statusCode = 200,
            ResponseMessageEnum message = ResponseMessageEnum.Success,                       
            List<MessageDto> errors = null,                       
            ApiError apiError = null,
            string apiVersion = "1.0.0"                      
        )
        {
            this.StatusCode = statusCode;
            this.Message = message.GetDescriptionByVal();
            this.Content = content;
            this.ResponseException = apiError;
            this.Version = apiVersion;           
            this.ErrorList = errors;           
            this.WarningList = warnings;
        }
    }

    public class ExternalResponse
    {
        public ExternalResponse()
        {
            this.Success = true;
            ErrorList = new Dictionary<string, string>();
            SuccessList = new Dictionary<string, string>();
            WarningList = new Dictionary<string, string>();
        }
        public object Content { get; set; }
        public Dictionary<string, string> ErrorList { get; set; }
        public Dictionary<string, string> SuccessList { get; set; }
        public Dictionary<string, string> WarningList { get; set; }
        public bool Success { get; set; } // true {Success & Warning}, false {Error}
    }
}