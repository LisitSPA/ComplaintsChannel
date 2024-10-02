using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EComplaintStatus //TODo
    {
        [Description("Pendiente")]
        Pending = 1,
        [Description("En proceso de investigaci�n")]
        InProcess = 2,       
        [Description("Finalizada")]
        Completed = 3,
        [Description("Desistimada")]
        Rejected = 4,
        [Description("Sanci�n Aplicada")]
        SanctionApplied = 5,
        [Description("Medidas preventivas")]
        PreventiveMeasures = 6,

    }
}