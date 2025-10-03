# Backend API - Trung tâm Du học Đức

## Công nghệ sử dụng
- NodeJS (ExpressJS)
- MySQL
- Sequelize ORM
- JWT, Bcrypt

## Cài đặt
```bash
npm install
```

## Chạy server
```bash
npm run dev
```

## Cấu hình
Tạo file `.env` trong thư mục gốc với nội dung mẫu:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=duhoc_duc
JWT_SECRET=your_jwt_secret
```

## Các chức năng chính
- Quản lý Tuyển sinh & Khóa học
- Quản lý Tin tức & Thông báo
- Đăng ký Tư vấn
- Xác thực, phân quyền (admin, user) 