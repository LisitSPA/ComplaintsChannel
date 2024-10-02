using Azure.AI.Translation.Text;
using Azure;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.SharePoint.Client;
using System.Collections.Generic;
using System.Linq;

namespace Application.Translator
{
    public interface IAzureTranslatorService
    {
        public Task<string> Translate(string text, string toLanguage);
    }

    public class AzureTranslatorService(IConfiguration _config) : IAzureTranslatorService
    {
        private readonly string apiKey = _config["AzureTranslator:Key"];
        private readonly string endpoint = _config["AzureTranslator:Endpoint"];
        private static readonly string fromLanguage = "es";

        public async Task<string> Translate(string text, string toLanguage)
        {
            var credential = new AzureKeyCredential(apiKey);
            TextTranslationClient client = new(credential);


            Response<IReadOnlyList<TranslatedTextItem>> response = await client.TranslateAsync(toLanguage, text).ConfigureAwait(false);
            IReadOnlyList<TranslatedTextItem> translations = response.Value;
            TranslatedTextItem translation = translations.FirstOrDefault();

            return translation.Translations[0].Text;
        }
    }
}

