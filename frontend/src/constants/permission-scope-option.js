import { PermissionScope } from "@/enum/permission-scope.enum"

export const PERMISSION_SCOPE_OPTIONS = [
  {
    label: 'Toàn bộ',
    value: PermissionScope.GLOBAL,
  },

  {
    label: 'Theo nhánh',
    value: PermissionScope.BRANCH,
  }
]
