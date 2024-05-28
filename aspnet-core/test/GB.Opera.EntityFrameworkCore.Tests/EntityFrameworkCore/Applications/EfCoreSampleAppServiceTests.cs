using GB.Opera.Samples;
using Xunit;

namespace GB.Opera.EntityFrameworkCore.Applications;

[Collection(OperaTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<OperaEntityFrameworkCoreTestModule>
{

}
