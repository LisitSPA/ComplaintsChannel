using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EComplaintStatus 
    {
        [Description("Pendiente")]
        Pending = 1,
        [Description("En proceso de investigación")]
        InProcess = 2,       
        [Description("Finalizada")]
        Completed = 3,
        [Description("Desistimada")]
        Rejected = 31,
        [Description("Sanción Aplicada")]
        SanctionApplied = 32,
        [Description("Medidas preventivas")]
        PreventiveMeasures = 33,

    }
}