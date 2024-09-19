using System;
using System.ComponentModel;

namespace Domain.Enums
{
    public enum EComplaintStatus //TODo
    {
        [Description("Registrada")]
        Registry = 1,
        InProcess = 2,
        Resolved = 3,

    }
}