using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace GB.Opera.Data;

/* This is used if database provider does't define
 * IOperaDbSchemaMigrator implementation.
 */
public class NullOperaDbSchemaMigrator : IOperaDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
