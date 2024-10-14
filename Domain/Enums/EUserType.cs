using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EUserType
    {
        Investigator = 1,
        Complainant = 2,
        Employee = 3,
        Administrator = 4,
    }
}