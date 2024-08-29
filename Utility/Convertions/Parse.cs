using System;
using System.IO;
using Utility.Extensions;
using Newtonsoft.Json.Linq;

namespace Utility.Convertions
{
    public static class Parse
    {

        public static DateTime? DateTimeNullable(string value)
        {
            System.DateTime result = new System.DateTime();
            if (System.DateTime.TryParse(value, out result))
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        public static DateTime DateTime(string value)
        {
            System.DateTime result = new System.DateTime();
            System.DateTime.TryParse(value, out result);
            return result;
        }

        public static DateTime DateTimeOrUtcNow(string value)
        {
            System.DateTime result = new System.DateTime();
            System.DateTime.TryParse(value, out result);

            if (result.Year == 1)
            {
                return System.DateTime.UtcNow;
            }

            return result;
        }

        public static decimal Decimal(string value)
        {
            decimal result = 0;
            decimal.TryParse(value, out result);
            return result;
        }

        public static decimal? DecimalNullable(string value)
        {
            decimal result = 0;
            if (decimal.TryParse(value, out result))
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        public static int Int(string value)
        {
            int result = 0;
            int.TryParse(value, out result);
            return result;
        }

        public static int? IntNullable(string value)
        {
            int result = 0;
            if (int.TryParse(value, out result))
            {
                return result;
            }
            else
            {
                return null;
            }
        }


        public static MemoryStream ByteArrayToStream(byte[] value)
        {
            return new MemoryStream(value);
        }

        #region Json Utilities       

        public static JObject MergeStringObjAndJson(string stringObject, JObject jsonObject)
        {
            JObject result = stringObject.ToJObject();

            foreach (var item in jsonObject)
            {
                result[item.Key] = item.Value;
            }

            return result;
        }
        #endregion
    }
}