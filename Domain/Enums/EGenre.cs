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
        [Description("Ninguno")]
        None = 3,
        [Description("Prefiero No Decirlo")]
        PreferNotSay = 4,

    }
}