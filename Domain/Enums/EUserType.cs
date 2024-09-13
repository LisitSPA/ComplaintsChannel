using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EUserType
    {
        Customer = 1,
        Complainant = 2,
        Employee = 4,
    }
}