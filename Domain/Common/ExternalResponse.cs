using System.Collections.Generic;

namespace Domain.Common
{
    public class ExternalResponse<TContent>
    {
        public ExternalResponse()
        {
            Success = true;
            ErrorList = new Dictionary<string, string>();
            SuccessList = new Dictionary<string, string>();
            WarningList = new Dictionary<string, string>();
        }
        public TContent Content { get; set; }
        public Dictionary<string, string> ErrorList { get; set; }
        public Dictionary<string, string> SuccessList { get; set; }
        public Dictionary<string, string> WarningList { get; set; }
        public bool Success { get; set; }
    }
}
