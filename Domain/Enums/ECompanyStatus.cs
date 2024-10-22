using System;
using System.ComponentModel;

namespace Domain.Enums
{
    public enum ECompanyStatus
    {
        [Description("Activo")]
        Active = 1,
        [Description("Inactivo")]
        Inactive = 2,

    }
}