using System;
using System.ComponentModel;

namespace Domain.Enums
{
    public enum EGenre
    {
        [Description("Femenino")]
        Female = 1,
        [Description("Masculino")]
        Male = 2,
        [Description("Otro")]
        Other = 3,
        [Description("No Informa")]
        None = 4,

    }
}