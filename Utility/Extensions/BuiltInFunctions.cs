using EntityFramework.Functions;

namespace Utility.Extensions
{
    public static class BuiltInFunctions
    {
        [Function(FunctionType.BuiltInFunction, "LEFT")]
        public static string Left(this string value, int count) => Function.CallNotSupported<string>();

        [Function(FunctionType.BuiltInFunction, "RIGHT")]
        public static string Right(this string value, int count) => Function.CallNotSupported<string>();

        [Function(FunctionType.BuiltInFunction, "JSON_VALUE")]
        public static string JsonValue(this string value, string path) => Function.CallNotSupported<string>();

        [Function(FunctionType.BuiltInFunction, "JSON_QUERY")]
        public static string JsonQuery(this string value, string path) => Function.CallNotSupported<string>();

        [Function(FunctionType.BuiltInFunction, "CONVERT")]
        public static decimal Convert(this string dataType, string expression, int style = 0) => Function.CallNotSupported<decimal>();

    }
}