using GB.Opera.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace GB.Opera.Permissions;

public class OperaPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(OperaPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(OperaPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<OperaResource>(name);
    }
}
