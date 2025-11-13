# Home Workout App

Ứng dụng tập luyện tại nhà với React frontend và Node.js backend.

## Tính năng

- 🏋️‍♂️ Theo dõi bài tập
- 📹 Video hướng dẫn tập luyện
- 👤 Quản lý hồ sơ người dùng
- 📊 Lịch sử tập luyện
- 🔐 Xác thực người dùng

## Cấu trúc Project

```
Home-Workout/
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md
```

## Cài đặt

### Prerequisites
- Node.js (v14 hoặc cao hơn)
- npm hoặc yarn

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Cấu hình database trong file .env
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

## Công nghệ sử dụng

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT Authentication

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

Distributed under the MIT License.