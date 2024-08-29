using Microsoft.Extensions.DependencyInjection;

namespace Api.Dependencies
{
    public static class ServicesExtensions
    {
        public static void AddCompression(this IServiceCollection services)
        {
            // Eliminate Null Values from response
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson(options =>
            //{
            //    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            //});

            // services.AddResponseCompression();
            //
            // services.Configure<GzipCompressionProviderOptions>(options =>
            // {
            //     options.Level = CompressionLevel.Optimal;
            // });
        } 
    }
}