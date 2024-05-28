using System.Threading.Tasks;

namespace GB.Opera.Data;

public interface IOperaDbSchemaMigrator
{
    Task MigrateAsync();
}
