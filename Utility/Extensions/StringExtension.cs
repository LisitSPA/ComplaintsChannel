using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Utility.Extensions
{
    public static class StringExtension
    {
        public static JObject ToJObject(this string strInput)
        {
            if (strInput == null || strInput == string.Empty)
            { return new JObject { }; }
            strInput = strInput.Trim();
            if ((strInput.StartsWith("{") && strInput.EndsWith("}")) || //For object
                (strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
            {
                try
                {
                    JObject obj = JObject.Parse(strInput);
                    return obj;
                }
                catch (JsonReaderException)
                {

                    JArray a = JArray.Parse(strInput);
                    //Exception in parsing json
                    //  Console.WriteLine(jex.Message);
                    return new JObject { };
                }
                catch (Exception) //some other exception
                {
                    //  Console.WriteLine(ex.ToString());
                    return new JObject { };
                }
            }
            else
            {
                return new JObject { };
            }
        }

        public static List<JObject> ToJObjectList(this string strInput)
        {
            if (strInput == null || strInput == string.Empty)
            { return new List<JObject>(); }
           
            strInput = strInput.Trim();
            if ((strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<JArray>(strInput).ToObject<List<JObject>>();
                    
                    return obj;
                }
                catch (JsonReaderException)
                {

                    return  new List<JObject>();
                }
              
            }
            else
            {
                return new List<JObject>();
            }
        }
        
        public static string GetDescription<T>(this T e) where T : IConvertible
        {
            List<string> description = new();

            if (e is Enum)
            {
                Type type = e.GetType();
                Array values = Enum.GetValues(type);

                foreach (Enum val in values)
                {
                    //if (val == e.ToInt32(CultureInfo.InvariantCulture))
                    if ((e as Enum).HasFlag(val)) //this is needed for some flag enums we have
                    {
                        var memInfo = type.GetMember(type.GetEnumName(val));
                        var descriptionAttributes = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                        if (descriptionAttributes.Length > 0)
                            description.Add(((DescriptionAttribute)descriptionAttributes[0]).Description);
                        else
                            description.Add(val.ToString());
                    }
                }
            }

            return string.Join(", ", description);
        }

        public static string GetDescriptionByVal<T>(this T e) where T : IConvertible
        {
            string description = "";

            if (e is Enum)
            {
                Type type = e.GetType();
                Array values = Enum.GetValues(type);

                foreach (Enum val in values)
                {
                    if ((e as Enum).Equals(val))
                    {
                        var memInfo = type.GetMember(type.GetEnumName(val));
                        var descriptionAttributes = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

                        if (descriptionAttributes.Length > 0)
                        {
                            description = ((DescriptionAttribute)descriptionAttributes[0]).Description;
                        }  
                        else
                        {
                            description = val.ToString();
                        }
                    }
                }
            }

            return description;
        }

        public static string[] GetWords(this string input)
        {
            var matches = Regex.Matches(input, @"\b[\w']*\b");

            return matches.Cast<Match>()
                .Where(m => !string.IsNullOrEmpty(m.Value))
                .Select(m => TrimSuffix(m.Value))
                .ToArray();
        }

        private static string TrimSuffix(string word)
        {
            int apostropheLocation = word.IndexOf('\'');

            if (apostropheLocation != -1)
            {
                word = word.Substring(0, apostropheLocation);
            }

            return word;
        }

    }
}