using Google.Cloud.Translation.V2;

namespace Utility.Translator
{
    public class Translator
    {
        /// <summary>
        /// es = español
        /// en = ingles
        /// pt = portugues
        /// </summary>
        /// <param name="text"></param>
        /// <param name="targetLanguage"></param>
        /// <returns></returns>
        public static string TranslateText(string text, string targetLanguage)
        {
            TranslationClient client = TranslationClient.Create();
            var response = client.TranslateText(text, targetLanguage);
            return response.TranslatedText;
        }
    }
}
