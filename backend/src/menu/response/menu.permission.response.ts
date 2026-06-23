export interface MenuPermissionResponse {
  id: number;
  menu_name: string;
  route: string;
  parent_id: number | null;
  sort_order: number;
  icon: string | null;
  module_name: string;
  component_path: string | null;
  menu_type: string | null;
  permissions: {
    id: number;
    permission_code: string;
    permission_name: string;
    description: string;
  }[];
}
