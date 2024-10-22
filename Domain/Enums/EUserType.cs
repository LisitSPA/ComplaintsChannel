using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EUserType
    {
        [Description("Investigador")]
        Investigator = 1,
        [Description("Denunciante")]
        Complainant = 2,
        [Description("Empleado")]
        Employee = 3,
        [Description("Administrador")]
        Administrator = 4,
    }
}