using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EComplaintStatus //TODo
    {
        [Description("Pendiente")]
        Pending = 1,
        [Description("En proceso de investigación")]
        InProcess = 2,       
        [Description("Finalizada")]
        Completed = 3,
        [Description("Desistimada")]
        Rejected = 4,
        [Description("Sanción Aplicada")]
        SanctionApplied = 5,
        [Description("Medidas preventivas")]
        PreventiveMeasures = 6,

    }
}