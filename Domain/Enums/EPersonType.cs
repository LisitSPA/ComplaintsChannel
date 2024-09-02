using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EPersonType
    {
        Complainant = 1,
        Employee = 2,
        Customer = 4,

    }
}