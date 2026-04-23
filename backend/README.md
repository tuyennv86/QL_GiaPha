# NestJS Phả Hệ API

API đăng nhập và phân quyền cho hệ thống quản lý gia phả.

## Cài đặt

```bash
npm install
```

## Cấu hình

Sao chép `.env` và chỉnh sửa thông tin kết nối:

```bash
cp .env .env.local
```

Chỉnh sửa các biến môi trường trong `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=pha_he
JWT_SECRET=your-very-strong-secret-key-min-16-chars
JWT_REFRESH_SECRET=your-very-strong-refresh-secret-key
```

## Chạy migration

```bash
psql -U postgres -d pha_he -f migration.sql
```

## Khởi động

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Auth

| Method | Endpoint                | Auth    | Mô tả                 |
| ------ | ----------------------- | ------- | --------------------- |
| POST   | `/auth/register`        | Public  | Đăng ký tài khoản     |
| POST   | `/auth/login`           | Public  | Đăng nhập             |
| POST   | `/auth/logout`          | JWT     | Đăng xuất             |
| POST   | `/auth/refresh`         | Refresh | Lấy access token mới  |
| GET    | `/auth/profile`         | JWT     | Xem thông tin cá nhân |
| POST   | `/auth/change-password` | JWT     | Đổi mật khẩu          |
| POST   | `/auth/forgot-password` | Public  | Quên mật khẩu         |
| POST   | `/auth/reset-password`  | Public  | Đặt lại mật khẩu      |

### Users

| Method | Endpoint           | Permission       |
| ------ | ------------------ | ---------------- |
| GET    | `/users`           | user.view        |
| GET    | `/users/:id`       | user.view        |
| GET    | `/users/:id/roles` | user.view        |
| POST   | `/users`           | user.create      |
| PATCH  | `/users/:id`       | user.edit        |
| DELETE | `/users/:id`       | user.delete      |
| POST   | `/users/:id/roles` | user.assign-role |

### Roles

| Method | Endpoint                 | Permission             |
| ------ | ------------------------ | ---------------------- |
| GET    | `/roles`                 | role.view              |
| GET    | `/roles/:id`             | role.view              |
| POST   | `/roles`                 | role.create            |
| PATCH  | `/roles/:id`             | role.edit              |
| DELETE | `/roles/:id`             | role.delete            |
| POST   | `/roles/:id/permissions` | role.assign-permission |

### Permissions

| Method | Endpoint           | Permission        |
| ------ | ------------------ | ----------------- |
| GET    | `/permissions`     | permission.view   |
| GET    | `/permissions/:id` | permission.view   |
| POST   | `/permissions`     | permission.create |
| PATCH  | `/permissions/:id` | permission.edit   |
| DELETE | `/permissions/:id` | permission.delete |

### Menu

| Method | Endpoint        | Permission  |
| ------ | --------------- | ----------- |
| GET    | `/menu/my-menu` | JWT         |
| GET    | `/menu/tree`    | menu.view   |
| GET    | `/menu`         | menu.view   |
| GET    | `/menu/:id`     | menu.view   |
| POST   | `/menu`         | menu.create |
| PATCH  | `/menu/:id`     | menu.edit   |
| DELETE | `/menu/:id`     | menu.delete |

---

## Ví dụ sử dụng

### Đăng nhập

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123"}'
```

### Dùng access token

```bash
curl http://localhost:3000/api/v1/auth/profile \
  -H "Authorization: Bearer <access_token>"
```

### Refresh token

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"<refresh_token>"}'
```
