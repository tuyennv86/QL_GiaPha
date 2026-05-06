export class RoleResponse {
  id: number;
  role_name: string;
  description: string;
  permissions: {
    id: number;
    permission_code: string;
    permission_name: string;
  }[];
}
export class RoleResponseList {
  items: RoleResponse[];
  total: number;
  page: number;
  limit: number;
}
