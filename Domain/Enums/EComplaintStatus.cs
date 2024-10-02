using System;
using System.ComponentModel;

namespace Domain.Enums
{
    public enum EComplaintStatus //TODo
    {
        [Description("Pendiente")]
        Pending = 1,
        [Description("En proceso de investigación")]
        InProcess = 2,
        [Description("Desistimada")]
        Rejected = 3,
        [Description("SancionAplicada")]
        sanctionApplied = 4,

    }
}