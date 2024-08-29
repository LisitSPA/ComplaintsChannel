using System.Collections.Generic;
using Utility.DTOs;

namespace Utility.ServiceErrorHandlers
{
    public class ErrorServiceProvider : IErrorServiceProvider
    {
        private List<MessageDto> _errors;
        private List<MessageDto> _warnings;       
        public ErrorServiceProvider()
        {
            _errors = new List<MessageDto>();
            _warnings = new List<MessageDto>();            
        }

        public void AddError(string errorCode, string errorMessage)
        {
            _errors.Add(new MessageDto() { Code = errorCode, Message = errorMessage });
        }

        public void AddErrorList(List<MessageDto> errors)
        {
            _errors.AddRange(errors);
        }

        public void AddWarning(string warningCode, string warningMessage)
        {
            _warnings.Add(new MessageDto() { Code = warningCode, Message = warningMessage });
        }

        public void AddWarningList(List<MessageDto> warnings)
        {
            warnings.ForEach(e => {
                _warnings.Add(e);
            });
        }

        public List<MessageDto> GetErrors()
        {
            return _errors;
        }

        public List<MessageDto> GetWarnings()
        {
            return _warnings;
        }

        public bool HasError()
        {
            return _errors.Count > 0;
        }

        public bool HasWarning()
        {
            return _warnings.Count > 0;
        }

    }
}