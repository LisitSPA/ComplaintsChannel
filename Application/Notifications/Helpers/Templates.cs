using DevExpress.DataAccess.DataFederation;
using DevExpress.XtraPrinting.Native;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using static DevExpress.XtraPrinting.Native.ExportOptionsPropertiesNames;

namespace Notifications.Helpers;

public static class Templates
{
    public static async Task<string> FillTemplate(string templatePath, string fileName, Dictionary<string, string> @params)
    {
        try
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), templatePath, fileName);
            var template = await File.ReadAllTextAsync(filePath);
        
            foreach (var (key, value) in @params)
            {
                template = template?.Replace($"$#{key}#$", value);
            }
          
            return template;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

    }
}