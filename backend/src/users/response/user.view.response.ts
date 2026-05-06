export class UserViewResponse {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  created_at: Date;
  last_login: Date;
  family?: { id: number; family_name: string } | null;
  roles: {
    id: number;
    role_name: string;
  }[];
}
