# Backend API - Trung tâm Du học nghề Đức (IECS)

Backend API cho hệ thống IECS, hỗ trợ quản lý học sinh, điểm danh, đánh giá, đặt lịch hẹn, tin tức, và tích hợp Zalo Mini App.

---

## 📋 Mục lục

- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Cấu hình](#cấu-hình)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Tích hợp Google Sheets](#tích-hợp-google-sheets)
- [Scripts hữu ích](#scripts-hữu-ích)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Công nghệ sử dụng

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize v6
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: Bcrypt.js
- **Environment Management**: dotenv
- **HTTP Client**: Axios (cho external API calls)
- **Logging**: Morgan
- **Date/Time**: Day.js

---

## ⚙️ Yêu cầu hệ thống

### Phần mềm cần thiết:
- **Node.js**: >= v14.x (khuyến nghị v16+ hoặc v18+)
- **PostgreSQL**: >= v12.x
- **npm**: >= v6.x hoặc **yarn**: >= v1.22.x

### Kiểm tra phiên bản:
```bash
node --version
npm --version
psql --version
```

---

## 📦 Cài đặt

### 1. Clone repository
```bash
git clone <repository-url>
cd IECS_MiniApp_Backend
```

### 2. Cài đặt dependencies
```bash
npm install
```

Hoặc nếu dùng yarn:
```bash
yarn install
```

### 3. Tạo database PostgreSQL

#### Trên local (nếu chưa có):
```bash
# Đăng nhập PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE duhoc_duc;

# Tạo user (optional)
CREATE USER duhoc_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE duhoc_duc TO duhoc_user;

# Thoát
\q
```

#### Trên production:
Sử dụng các dịch vụ PostgreSQL hosting như:
- Neon (https://neon.tech) *khuyên dùng*.
- Supabase (https://supabase.com)
- Railway (https://railway.app)
- Render (https://render.com)

---

## 🔧 Cấu hình

### 1. Tạo file `.env`

Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

### 2. Cấu hình biến môi trường

Mở file `.env` và điền thông tin:

```env
# Database Configuration
DB_HOST=your-postgres-host.com
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=duhoc_duc
DB_PORT=5432
DB_SSLMODE=require

# JWT Secret (tạo random string mạnh)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Google Sheets Integration (optional)
GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/your-script-id/exec

# Server Port (optional)
PORT=5000
```

### 3. Tạo JWT Secret mạnh

Sử dụng một trong các cách sau để tạo JWT secret:

```bash
# Sử dụng Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Hoặc sử dụng OpenSSL
openssl rand -hex 64
```

---

## 🏃 Chạy ứng dụng

### Development mode (với nodemon - auto reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:5000` (hoặc PORT được cấu hình trong `.env`)

### Kiểm tra server đã chạy:
Khi server khởi động thành công, bạn sẽ thấy:
```
✅ Database connection successful!
✅ Database synced successfully!
🚀 Server is running at http://localhost:5000
```

---

## 📁 Cấu trúc dự án

```
IECS_MiniApp_Backend/
├── config/                    # Database và cấu hình
│   └── db.js                 # Sequelize connection
├── src/
│   ├── controllers/          # Business logic layer
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── student.controller.js
│   │   ├── attendance.controller.js
│   │   ├── testScore.controller.js
│   │   ├── comment.controller.js
│   │   ├── course.controller.js
│   │   ├── admission.controller.js
│   │   ├── news.controller.js
│   │   ├── consult.controller.js
│   │   └── staff.controller.js
│   ├── models/               # Sequelize models (Database schema)
│   │   ├── user.model.js
│   │   ├── student.model.js
│   │   ├── attendance.model.js
│   │   ├── testScore.model.js
│   │   ├── comment.model.js
│   │   ├── course.model.js
│   │   ├── admission.model.js
│   │   ├── news.model.js
│   │   ├── consult.model.js
│   │   └── staff.model.js
│   ├── routes/               # API routes
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── student.route.js
│   │   ├── attendance.route.js
│   │   ├── testScore.route.js
│   │   ├── comment.route.js
│   │   ├── course.route.js
│   │   ├── admission.route.js
│   │   ├── news.route.js
│   │   ├── consult.route.js
│   │   └── staff.route.js
│   ├── middlewares/          # Express middlewares
│   │   └── auth.middleware.js # JWT authentication & authorization
│   ├── services/             # External services integration
│   └── app.js                # Express app entry point
├── docs/                     # Documentation files
├── .env                      # Environment variables (không commit)
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
├── seed-students.js          # Script seed dữ liệu học sinh
├── seed-test-data.js         # Script seed dữ liệu test
├── test-api.js               # Script test API
└── README.md
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Đăng ký tài khoản
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "user123",
  "password": "password123",
  "email": "user@example.com",
  "phone": "0123456789",
  "role": "user"
}
```

#### 2. Đăng nhập
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user123",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

### User Management Endpoints

```http
GET    /api/users              # Lấy danh sách users (Admin only)
GET    /api/users/:id          # Lấy thông tin user theo ID (Admin only)
PUT    /api/users/:id          # Cập nhật user (Admin only)
DELETE /api/users/:id          # Xóa user (Admin only)
```

### Student Management Endpoints

#### Admin routes (require admin role):
```http
POST   /api/students/admin            # Tạo học sinh mới
GET    /api/students/admin            # Lấy tất cả học sinh
PUT    /api/students/admin/:id        # Cập nhật học sinh
DELETE /api/students/admin/:id        # Xóa học sinh
```

#### Parent routes (require authentication):
```http
POST   /api/students/claim            # Phụ huynh claim học sinh
GET    /api/students                  # Lấy danh sách học sinh của tôi
GET    /api/students/:id              # Lấy chi tiết học sinh
```

### Attendance Endpoints
```http
POST   /api/attendances               # Ghi nhận điểm danh (Admin)
GET    /api/attendances               # Lấy danh sách điểm danh
GET    /api/attendances/student/:id   # Lấy điểm danh của học sinh
PUT    /api/attendances/:id           # Cập nhật điểm danh (Admin)
DELETE /api/attendances/:id           # Xóa điểm danh (Admin)
```

### Test Score Endpoints
```http
POST   /api/test-scores               # Tạo điểm thi (Admin)
GET    /api/test-scores               # Lấy tất cả điểm thi
GET    /api/test-scores/student/:id   # Lấy điểm thi của học sinh
PUT    /api/test-scores/:id           # Cập nhật điểm (Admin)
DELETE /api/test-scores/:id           # Xóa điểm (Admin)
```

### Comment Endpoints
```http
POST   /api/comments                  # Tạo comment/đánh giá (Admin)
GET    /api/comments                  # Lấy tất cả comments
GET    /api/comments/student/:id      # Lấy comments của học sinh
PUT    /api/comments/:id              # Cập nhật comment (Admin)
DELETE /api/comments/:id              # Xóa comment (Admin)
```

### Course Management Endpoints
```http
POST   /api/courses                   # Tạo khóa học (Admin)
GET    /api/courses                   # Lấy danh sách khóa học
GET    /api/courses/:id               # Lấy chi tiết khóa học
PUT    /api/courses/:id               # Cập nhật khóa học (Admin)
DELETE /api/courses/:id               # Xóa khóa học (Admin)
```

### Admission Endpoints
```http
POST   /api/admissions                # Đăng ký tuyển sinh
GET    /api/admissions                # Lấy danh sách đăng ký (Admin)
GET    /api/admissions/:id            # Chi tiết đăng ký (Admin)
PUT    /api/admissions/:id            # Cập nhật trạng thái (Admin)
DELETE /api/admissions/:id            # Xóa đăng ký (Admin)
```

### News Endpoints
```http
POST   /api/news                      # Tạo tin tức (Admin)
GET    /api/news                      # Lấy danh sách tin tức
GET    /api/news/:id                  # Chi tiết tin tức
PUT    /api/news/:id                  # Cập nhật tin tức (Admin)
DELETE /api/news/:id                  # Xóa tin tức (Admin)
```

### Consultation Endpoints
```http
POST   /api/consults                  # Đăng ký tư vấn
GET    /api/consults                  # Lấy danh sách tư vấn (Admin)
GET    /api/consults/:id              # Chi tiết yêu cầu tư vấn (Admin)
PUT    /api/consults/:id              # Cập nhật trạng thái (Admin)
DELETE /api/consults/:id              # Xóa yêu cầu (Admin)
```

### Staff Endpoints
```http
POST   /api/staffs                    # Thêm nhân viên (Admin)
GET    /api/staffs                    # Lấy danh sách nhân viên
GET    /api/staffs/:id                # Chi tiết nhân viên
PUT    /api/staffs/:id                # Cập nhật nhân viên (Admin)
DELETE /api/staffs/:id                # Xóa nhân viên (Admin)
```

### Headers cho authenticated requests:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Chi tiết tất cả API:
```http
Ở trong docs và Collection Postman được tạo sẵn (import và test thôi 😉)
```

---

## 🗄️ Database Schema

### Users Table
- `id` - Primary Key
- `username` - Unique, cho đăng nhập thông thường
- `password` - Hashed password
- `role` - ENUM('admin', 'user')
- `zalo_id` - Unique, cho Zalo login
- `display_name` - Tên hiển thị
- `avatar` - URL avatar
- `email` - Email
- `phone` - Số điện thoại
- `locale` - Ngôn ngữ
- `last_seen_at` - Lần cuối online
- `metadata` - JSONB, dữ liệu bổ sung
- `created_at`, `updated_at` - Timestamps

### Students Table
- `id` - Primary Key
- Thông tin học sinh (tên, ngày sinh, lớp, v.v.)
- Foreign Keys liên kết với Users (phụ huynh)

### Attendances Table
- `id` - Primary Key
- `student_id` - Foreign Key → Students
- `attendance_date` - Ngày điểm danh
- `status` - Trạng thái (present/absent/late)
- `note` - Ghi chú

### TestScores Table
- `id` - Primary Key
- `student_id` - Foreign Key → Students
- `test_name` - Tên bài kiểm tra
- `score` - Điểm số
- `max_score` - Điểm tối đa
- `test_date` - Ngày thi

### Comments Table
- `id` - Primary Key
- `student_id` - Foreign Key → Students
- `teacher_id` - Foreign Key → Users
- `comment` - Nội dung đánh giá
- `comment_date` - Ngày đánh giá

### Courses, Admissions, News, Consults, Staff Tables
- Các bảng quản lý thông tin tương ứng

**Note**: Database schema được tự động sync khi chạy app (xem `sequelize.sync({ alter: true })` trong `app.js`)

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Đăng ký/Đăng nhập** → Nhận JWT token
2. **Gửi request với token** trong header:
   ```
   Authorization: Bearer <token>
   ```
3. **Middleware `authenticateToken`** verify token
4. **Middleware `authorizeRole`** kiểm tra role (nếu cần)

### Roles
- **admin**: Toàn quyền quản lý hệ thống
- **user**: Phụ huynh, xem thông tin học sinh của mình

### Zalo Integration
Hệ thống hỗ trợ đăng nhập qua Zalo Mini App:
- Lưu `zalo_id` trong database
- Tự động tạo user mới nếu chưa tồn tại
- Không cần username/password cho Zalo users

---

## 📊 Tích hợp Google Sheets

Dự án hỗ trợ đồng bộ dữ liệu với Google Sheets thông qua Google Apps Script Web App.

### Cấu hình:
1. Deploy Google Apps Script như một Web App
2. Copy URL deployment
3. Thêm vào `.env`:
   ```env
   GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/your-id/exec
   ```

### Chi tiết cách cài đặt
```http
Ở trong docs 😉
```

### Sử dụng:
Các controller có thể gọi API Google Sheets để:
- Ghi log
- Đồng bộ dữ liệu
- Export báo cáo

---

## 🛠️ Scripts hữu ích

### Seed dữ liệu học sinh
```bash
node seed-students.js
```

### Seed dữ liệu test
```bash
node seed-test-data.js
```

### Test API
```bash
node test-api.js
```

### Database operations
```bash
# Reset database (xóa và tạo lại)
# Cẩn thận: Lệnh này sẽ xóa toàn bộ dữ liệu!
dropdb duhoc_duc && createdb duhoc_duc
npm run dev  # Sequelize sẽ tự động tạo lại tables
```

---

## 🐛 Troubleshooting

### Lỗi kết nối database

**Lỗi**: `ECONNREFUSED` hoặc `Connection timeout`

**Giải pháp**:
1. Kiểm tra PostgreSQL đang chạy: `pg_isready`
2. Kiểm tra credentials trong `.env`
3. Kiểm tra `DB_PORT` (mặc định 5432)
4. Kiểm tra firewall/security groups nếu dùng cloud database
5. Với SSL: đảm bảo `DB_SSLMODE=require` được set

### Lỗi "JWT must be provided"

**Giải pháp**:
- Đảm bảo gửi header: `Authorization: Bearer <token>`
- Token lấy từ response của `/api/auth/login`
- Kiểm tra token chưa expired (mặc định expire sau 24h)

### Lỗi "sequelize.sync()" failed

**Giải pháp**:
1. Xóa tất cả tables trong database
2. Restart server để Sequelize tạo lại schema
3. Hoặc đổi từ `alter: true` thành `force: true` (cẩn thận: xóa data)

### Port already in use

**Lỗi**: `EADDRINUSE: address already in use :::5000`

**Giải pháp**:
```bash
# Tìm process đang dùng port
netstat -ano | findstr :5000  # Windows

# Kill process
taskkill /PID <PID> /F  # Windows

# Hoặc đổi PORT trong .env
PORT=5001
```

### Environment variables không load

**Giải pháp**:
1. Đảm bảo file `.env` ở root directory
2. Restart server sau khi sửa `.env`
3. Không có space xung quanh dấu `=`: `PORT=5000` ✅, `PORT = 5000` ❌

---

## 📝 Development Guidelines

### Thêm API endpoint mới

1. **Tạo Model** trong `src/models/`:
   ```javascript
   const { DataTypes } = require('sequelize');
   const { sequelize } = require('../../config/db');
   
   const YourModel = sequelize.define('YourModel', {
     // định nghĩa fields
   });
   
   module.exports = YourModel;
   ```

2. **Tạo Controller** trong `src/controllers/`:
   ```javascript
   const YourModel = require('../models/yourModel.model');
   
   exports.create = async (req, res) => {
     // logic
   };
   ```

3. **Tạo Route** trong `src/routes/`:
   ```javascript
   const router = require('express').Router();
   const controller = require('../controllers/yourController');
   const { authenticateToken } = require('../middlewares/auth.middleware');
   
   router.post('/', authenticateToken, controller.create);
   
   module.exports = router;
   ```

4. **Đăng ký Route** trong `src/app.js`:
   ```javascript
   app.use('/api/your-endpoint', require('./routes/your.route'));
   ```

---

## 🚀 Deployment

### Các nền tảng khuyến nghị:

1. **Render** (Dễ nhất, commit ở dự án = deploy 😉)
   - Free tier với PostgreSQL
   - Auto deploy từ GitHub

2. **VPS** (AWS EC2, DigitalOcean, etc.)
   - Cần setup PM2 để quản lý process
   - Cần setup Nginx reverse proxy
   - Cần setup PostgreSQL manually

* `Khuyên Dùng`: **Render** + **NeonDB**
   - Dùng Render để deploy source.
   - Dùng NeonDB để tạo database.

### Environment cho production:
```env
NODE_ENV=production
DB_SSLMODE=require
JWT_SECRET=<strong-random-secret>
```

### Sử dụng PM2 (cho VPS):
```bash
npm install -g pm2
pm2 start src/app.js --name iecs-backend
pm2 startup  # Auto start on reboot
pm2 save
```

---

## 👥 Contact & Support

Nếu gặp vấn đề khi setup hoặc cần hỗ trợ, vui lòng liên hệ [Duy Công](https://t.me/ntdcong).

**Lưu ý cho dev mới**: 
- Đọc kỹ README trước khi bắt đầu
- Kiểm tra `.env.example` để biết các biến môi trường cần thiết
- Chạy test scripts để đảm bảo setup đúng
- Đừng ngại hỏi nếu gặp khó khăn

---

**Made with ❤️ by DCong** 