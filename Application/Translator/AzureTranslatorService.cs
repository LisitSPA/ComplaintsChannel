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
using RestSharp;
using Application.Translator.Queries.DTOs;

namespace Application.Translator
{
    public interface IAzureTranslatorService
    {
        public Task<string> Translate(string text, string toLanguage);
    }

    public class AzureTranslatorService(IConfiguration _config) : IAzureTranslatorService
    {
        private readonly string key = _config["AzureTranslator:Key"];
        private readonly string endpoint = _config["AzureTranslator:Endpoint"];
        private readonly string from = "es";
        private static readonly string location = "eastus";

        public async Task<string> Translate(string text, string toLanguage)
        {
            try
            {
                string route = $"/translate?api-version=3.0&from={from}&to={toLanguage}";
                object[] body = new object[] { new { Text = text } };
                var requestBody = JsonConvert.SerializeObject(body);

                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage())
                {
                    request.Method = HttpMethod.Post;
                    request.RequestUri = new Uri(endpoint + route);
                    request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                    request.Headers.Add("Ocp-Apim-Subscription-Key", key);
                    request.Headers.Add("Ocp-Apim-Subscription-Region", location);


                    HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);

                    string responseString = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<AzureResponseDto[]>(responseString)[0].translations[0].text;
                    return result;
                }
            }
            catch (Exception ex)
            {
                return text;
            }
            

        }
    }
}

