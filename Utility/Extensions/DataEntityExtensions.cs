
using System.Linq.Expressions;
using System.Linq;

namespace System.Data.Entity;

public static class DataEntityExtensions
{
    public static IQueryable<T> IncludeIf<T, TProperty>(this IQueryable<T> source,  Expression<Func<T, TProperty>> path,bool condition) where T : class
    {
        if (condition)
            return source.Include(path);

        return source;
    }

}
