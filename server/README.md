# Home Workout Backend

## Setup

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file .env từ .env.example và cập nhật thông tin

3. Chạy MongoDB (local hoặc MongoDB Atlas)

4. Seed database:
```bash
npm run seed
```

5. Chạy server:
```bash
npm run dev
```

## API Endpoints

### Auth
- POST `/api/auth/register` - Đăng ký
- POST `/api/auth/login` - Đăng nhập  
- GET `/api/auth/me` - Lấy thông tin user

### Exercises
- GET `/api/exercises` - Lấy danh sách bài tập
- GET `/api/exercises/:id` - Chi tiết bài tập
- GET `/api/exercises/muscle-groups` - Danh sách nhóm cơ

### Health Check
- GET `/api/health` - Kiểm tra server