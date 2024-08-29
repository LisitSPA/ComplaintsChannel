using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;

namespace Utility.AppInsights
{
    public static class AppInsights
    {
        public static void TraceError(this TelemetryClient _telemetry, string error)
        {
            _telemetry.TrackTrace(error, SeverityLevel.Error);
        }
        public static void TraceInformation(this TelemetryClient _telemetry, string information)
        {
            _telemetry.TrackTrace(information, SeverityLevel.Information);
        }
    }
}
