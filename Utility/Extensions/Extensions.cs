using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Linq.Dynamic.Core;
using System.Data.Entity;

namespace Utility.Extensions
{
    public static class Extensions
    {
        #region OrderBy
        /// <summary>
        /// Define an extension method to the original Linq method OrderBy.
        /// </summary>
        /// <param name="source"></param>
        /// <param name="orderByProperty">Name of the property by wich the Order operation will be performed</param>
        /// <param name="ascending">true if ASCENDING, false if DESCENDING. Default value: true</param>
        /// <returns></returns>
        public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, string orderByProperty, bool ascending = true) where TEntity : class
        {
            string command = (ascending) ? "OrderBy" : "OrderByDescending";

            Type type = typeof(TEntity);

            ParameterExpression parameter = Expression.Parameter(type, "p");

            Expression property = parameter.SearchField(orderByProperty);

            LambdaExpression orderByExpression = Expression.Lambda(property, parameter);

            MethodCallExpression resultExpression = Expression.Call(typeof(Queryable),
                    command,
                    new Type[] { type, property.Type },
                    source.Expression,
                    Expression.Quote(orderByExpression));

            return (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);
        }

        public static IOrderedQueryable<TEntity> ThenBy<TEntity>(this IOrderedQueryable<TEntity> source, string orderByProperty, bool ascending = true) where TEntity : class
        {
            string command = (ascending) ? "ThenBy" : "ThenByDescending";

            Type type = typeof(TEntity);

            ParameterExpression parameter = Expression.Parameter(type, "p");

            Expression property = parameter.SearchField(orderByProperty);

            LambdaExpression orderByExpression = Expression.Lambda(property, parameter);

            MethodCallExpression resultExpression = Expression.Call(typeof(Queryable),
                    command,
                    new Type[] { type, property.Type },
                    source.Expression,
                    Expression.Quote(orderByExpression));

            return (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);
        }

        public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, Dictionary<string, bool> orderList) where TEntity : class
        {
            IOrderedQueryable<TEntity> result = null;

            foreach (KeyValuePair<string, bool> item in orderList)
            {
                if (item.Key == orderList.FirstOrDefault().Key)
                {
                    result = source.OrderBy(item.Key, item.Value);
                }
                else
                {
                    result = result.ThenBy(item.Key, item.Value);
                }
            }

            return result ?? (IOrderedQueryable<TEntity>)source;
        }

        public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, IEnumerable<string> properties, IEnumerable<string> directions) where TEntity : class
        {
            var orderList = new Dictionary<string, bool>();
            for (var i = 0; i < properties.Count(); i++)
                orderList.Add(properties.ElementAt(i), i >= directions.Count() || directions.ElementAt(i) != "desc");

            return source.OrderBy(orderList);
        }

        public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, string property, string direction) where TEntity : class
        {
            var orderList = new Dictionary<string, bool>();
            orderList.Add(property, direction.ToLower() != "desc");
            return source.OrderBy(orderList);
        }

        /// <summary>
        /// Dynamic OrderBy
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="commaSeparatedPropertiesAndDirection">Example: "City, CompanyName desc"</param>
        /// <returns></returns>
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string commaSeparatedPropertiesAndDirection)
        {
            if (string.IsNullOrWhiteSpace(commaSeparatedPropertiesAndDirection))
            {
                var idProp = source.ElementType.GetProperties().FirstOrDefault(x => x.Name == "Id")?.Name;
                idProp ??= source.ElementType.GetProperties().FirstOrDefault(x => x.Name.Contains("Id"))?.Name;
                return DynamicQueryableExtensions.OrderBy(source, idProp);
            }
            return DynamicQueryableExtensions.OrderBy(source, commaSeparatedPropertiesAndDirection);
        }
        #endregion

        #region Dynamic PropertyContains
        public static IQueryable<T> PropertyContains<T>(this IQueryable<T> source, IEnumerable<string> propertiesToSearch, string searchString)
        {
            var stringProperties = source.ElementType.GetProperties()
            .Where(x => x.PropertyType == typeof(string))
            .Select(x => x.Name.ToUpper())
            .ToArray();
            var predicate = string.Join(" || ",
                propertiesToSearch.Select(x => $"{(stringProperties.Contains(x.ToUpper()) ? x : $"{x}.ToString()")}.ToUpper().Contains(@0)"));
            return source.Where(predicate, searchString.ToUpper());
        }

        public static IQueryable<T> PropertyContains<T>(this IQueryable<T> source, string commaSeparatedProperties, string searchString)
            => source.PropertyContains(commaSeparatedProperties.Split(",").Select(x => x.Trim()), searchString);
        #endregion

        #region ContainsStrings for Objects
        public static IQueryable<T> ContainsStrings<T>(this IQueryable<T> source, string nameofFieldToSearch, string searchString)
        {
            Type type = typeof(T);
            ParameterExpression parameter = Expression.Parameter(type, "p");

            return source.Where(GetCondition<T>(parameter, nameofFieldToSearch, searchString));
        }

        public static IQueryable<T> ContainsStrings<T>(this IQueryable<T> source, Dictionary<string, string> propertyValueSearchList)
        {
            foreach (KeyValuePair<string, string> item in propertyValueSearchList)
            {
                source = source.ContainsStrings(item.Key, item.Value);
            }

            return source;
        }
        #endregion

        #region ContainString for Jsons
        public static IQueryable<TEntity> JsonContains<TEntity>(this IQueryable<TEntity> source, Expression<Func<TEntity, string>> field, string path, string searchString) where TEntity : class
        {
            ParameterExpression parameter = field.Parameters.FirstOrDefault();
            Expression propertyAccess = field.Body;

            MethodInfo jsonValue = typeof(BuiltInFunctions).GetMethod("JsonValue", new[] { typeof(string), typeof(string) });
            MethodInfo containsFn = typeof(string).GetMethod("Contains", new[] { typeof(string) });

            path = path.StartsWith("$.") ? path : "$." + path;

            MethodCallExpression jsonQueryCall = Expression.Call(jsonValue, propertyAccess, Expression.Constant(path));
            MethodCallExpression containsCall = Expression.Call(jsonQueryCall, containsFn, Expression.Constant(searchString));

            LambdaExpression exp = Expression.Lambda(containsCall, parameter);
            return source.Where((Expression<Func<TEntity, bool>>)exp);
        }

        public static IQueryable<TEntity> JsonContains<TEntity>(this IQueryable<TEntity> source, Expression<Func<TEntity, string>> field, Dictionary<string, string> orderList) where TEntity : class
        {
            foreach (KeyValuePair<string, string> item in orderList)
            {
                source = source.JsonContains(field, item.Key, item.Value);
            }

            return source;
        }
        #endregion

        #region Page
        public static IQueryable<T> Page<T>(this IQueryable<T> query, int pageNbr, int pageSize)
        {
            int skip = Math.Max(pageSize * (pageNbr - 1), 0);
            return query.Skip(skip).Take(pageSize);
        }

        public static IEnumerable<T> Page<T>(this IEnumerable<T> query, int pageNbr, int pageSize)
        {
            int skip = Math.Max(pageSize * (pageNbr - 1), 0);
            return query.Skip(skip).Take(pageSize);
        }
        #endregion

        public static decimal? ToDecimal(this string value)
        {
            try
            {
                return Convert.ToDecimal(value);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static string Between(this string value, char from, char to)
        {
            int posFrom = value.IndexOf(from);
            int posTo = value.Substring(posFrom).IndexOf(to) + posFrom;
            if (posFrom == -1)
            {
                return "";
            }
            if (posTo == -1)
            {
                return "";
            }
            int adjustedPosFrom = posFrom + 1;
            if (adjustedPosFrom >= posTo)
            {
                return "";
            }
            return value.Substring(adjustedPosFrom, posTo - adjustedPosFrom);
        }

        public static string After(this string value, char from, int lenght)
        {
            int posFrom = value.LastIndexOf(from);
            if (posFrom == -1)
            {
                return "";
            }
            int adjustedPosFrom = posFrom + 1;
            if (adjustedPosFrom >= value.Length)
            {
                return "";
            }
            return value.Substring(adjustedPosFrom, lenght);
        }

        public static string Before(this string value, int posfrom, char to)
        {
            int posTo = value.LastIndexOf(to);
            if (posTo == -1)
            {
                return "";
            }
            return value.Substring(posfrom, posTo);
        }

        #region Private Methods
        static Expression<Func<TEntity, bool>> GetCondition<TEntity>(this ParameterExpression parameter, string nameofFieldToSearch, string searchString)
        {
            Expression propertyAccess = parameter.SearchField(nameofFieldToSearch);

            MethodInfo containsFn = typeof(string).GetMethods().First(m => m.Name == "Contains" && m.GetParameters().Length == 1);

            Expression strProperty = propertyAccess.AsString();

            MethodCallExpression callToUpper = Expression.Call(strProperty, "ToUpper", null);
            MethodCallExpression callContain = Expression.Call(callToUpper, containsFn, Expression.Constant(searchString.ToUpper()));

            LambdaExpression exp = Expression.Lambda(callContain, parameter);

            return (Expression<Func<TEntity, bool>>)exp;
        }

        static Expression SearchField(this Expression parameter, string fieldName)
        {
            Expression memberAccess = parameter;
            try
            {
                foreach (string property in fieldName.Split('.'))
                    memberAccess = Expression.PropertyOrField(memberAccess, property);
            }
            catch (Exception)
            {
                throw new Exception("Invalid property name: " + fieldName);
            }

            return memberAccess;
        }

        static Expression AsString(this Expression expression)
        {
            return expression.Type == typeof(string) ? expression : Expression.Call(Expression.Convert(expression, typeof(object)), "ToString", null);
        }
        #endregion
    }
}