using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EUserType
    {
        [Description("Denunciante")]
        Complainant = 2,
        [Description("Empleado")]
        Employee = 3,
        [Description("Administrador")]
        Administrator = 4,
        [Description("Investigador")]
        Investigator = 5,
    }
}