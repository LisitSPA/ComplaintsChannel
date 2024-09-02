using System;
using System.ComponentModel;

namespace Domain.Enums
{
    public enum ECompanyStatus
    {
        [Description("Active")]
        Active = 1,
        [Description("Inactive")]
        Inactive = 2,

    }
}