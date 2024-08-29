using System.Collections.Generic;
using System.Linq.Expressions;

namespace System.Linq;

public static class LinqExtensions
{
    public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> source, Expression<Func<TSource, bool>> predicate, bool condition)
    {
        if(source == null)
            throw new ArgumentNullException(nameof(source));

        if(predicate == null)
            throw new ArgumentNullException(nameof(predicate));

        if (condition)
            return source.Where(predicate);

        return source;
    }

    public static bool IsEmptyList<T>(this IList<T> list) where T : class
    {
        return list == null || list.Count == 0;
    }
}
