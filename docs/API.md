# Tài liệu API - Trung tâm Du học Đức

## 1. Đăng ký & Đăng nhập

### Đăng ký tài khoản
**POST** `/api/auth/register`
```json
{
  "username": "admin1",
  "password": "123456",
  "role": "admin" // hoặc "user"
}
```
**Response:**
```json
{
  "message": "Đăng ký thành công",
  "user": {
    "id": 1,
    "username": "admin1",
    "role": "admin"
  }
}
```

### Đăng nhập
**POST** `/api/auth/login`
```json
{
  "username": "admin1",
  "password": "123456"
}
```
**Response:**
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "username": "admin1",
    "role": "admin"
  }
}
```

---

## 2. Quản lý Khóa học (Courses)

### Lấy danh sách khóa học
**GET** `/api/courses`
**Response:**
```json
[
  {
    "id": 1,
    "title": "Khóa học tiếng Đức A1",
    "description": "Khóa học cơ bản cho người mới bắt đầu",
    "startDate": "2024-07-01T00:00:00.000Z",
    "endDate": "2024-09-30T00:00:00.000Z"
  }
]
```

### Thêm khóa học (admin)
**POST** `/api/courses`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
```json
{
  "title": "Khóa học tiếng Đức B1",
  "description": "Nâng cao kỹ năng giao tiếp",
  "startDate": "2024-10-01",
  "endDate": "2024-12-31"
}
```
**Response:**
```json
{
  "id": 2,
  "title": "Khóa học tiếng Đức B1",
  "description": "Nâng cao kỹ năng giao tiếp",
  "startDate": "2024-10-01T00:00:00.000Z",
  "endDate": "2024-12-31T00:00:00.000Z"
}
```

---

## 3. Quản lý Tuyển sinh (Admissions)

### Lấy danh sách tuyển sinh
**GET** `/api/admissions`
**Response:**
```json
[
  {
    "id": 1,
    "title": "Tuyển sinh du học Đức 2024",
    "content": "Thông tin chi tiết về đợt tuyển sinh...",
    "deadline": "2024-08-31T00:00:00.000Z"
  }
]
```

### Thêm đợt tuyển sinh (admin)
**POST** `/api/admissions`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
```json
{
  "title": "Tuyển sinh du học Đức 2025",
  "content": "Thông tin chi tiết về đợt tuyển sinh 2025...",
  "deadline": "2025-08-31"
}
```
**Response:**
```json
{
  "id": 2,
  "title": "Tuyển sinh du học Đức 2025",
  "content": "Thông tin chi tiết về đợt tuyển sinh 2025...",
  "deadline": "2025-08-31T00:00:00.000Z"
}
```

---

## 4. Quản lý Tin tức & Thông báo (News)

### Lấy danh sách tin tức
**GET** `/api/news`
**Response:**
```json
[
  {
    "id": 1,
    "title": "Lịch khai giảng mới",
    "content": "Trung tâm thông báo lịch khai giảng mới...",
    "createdAt": "2024-06-01T10:00:00.000Z"
  }
]
```

### Thêm tin tức (admin)
**POST** `/api/news`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
```json
{
  "title": "Thông báo nghỉ lễ",
  "content": "Trung tâm nghỉ lễ từ 1/9 đến 3/9/2024"
}
```
**Response:**
```json
{
  "id": 2,
  "title": "Thông báo nghỉ lễ",
  "content": "Trung tâm nghỉ lễ từ 1/9 đến 3/9/2024",
  "createdAt": "2024-06-10T09:00:00.000Z"
}
```

---

## 5. Đăng ký Tư vấn (Consults)

### Gửi đăng ký tư vấn (user)
**POST** `/api/consults`
```json
{
  "name": "Nguyễn Văn A",
  "email": "vana@gmail.com",
  "phone": "0912345678",
  "message": "Tôi muốn tư vấn về du học Đức"
}
```
**Response:**
```json
{
  "message": "Đăng ký tư vấn thành công",
  "consult": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "vana@gmail.com",
    "phone": "0912345678",
    "message": "Tôi muốn tư vấn về du học Đức",
    "status": "pending"
  }
}
```

### Admin xem danh sách đăng ký tư vấn
**GET** `/api/consults`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
**Response:**
```json
[
  {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "vana@gmail.com",
    "phone": "0912345678",
    "message": "Tôi muốn tư vấn về du học Đức",
    "status": "pending"
  }
]
```

### Admin cập nhật trạng thái tư vấn
**PUT** `/api/consults/1/status`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
```json
{
  "status": "done"
}
```
**Response:**
```json
{
  "message": "Cập nhật trạng thái thành công",
  "consult": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "vana@gmail.com",
    "phone": "0912345678",
    "message": "Tôi muốn tư vấn về du học Đức",
    "status": "done"
  }
}
```

### API trả về danh sách những ngày đã book
**PUT** `/api/consults/booked-dates`
**Response:**
```json
{
  "bookedDates": [
        "2025-09-18",
        "2025-09-19"
    ]
}
```


---

## 6. Quản lý Nhân sự (Staff)

### Lấy danh sách nhân sự
**GET** `/api/staffs`
**Response:**
```json
[
  {
    "id": 1,
    "image": "https://example.com/image1.jpg",
    "position": "Tư vấn viên"
  }
]
```

### Lấy nhân sự theo id
**GET** `/api/staffs/1`
**Response:**
```json
{
  "id": 1,
  "image": "https://example.com/image1.jpg",
  "position": "Tư vấn viên"
}
```

### Lấy nhân sự theo vị trí
**GET** `/api/staffs/position/Tư vấn viên`
**Response:**
```json
[
  {
    "id": 1,
    "image": "https://example.com/image1.jpg",
    "position": "Tư vấn viên"
  }
]
```

### Thêm nhân sự (admin)
**POST** `/api/staffs`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
```json
{
  "image": "https://example.com/image2.jpg",
  "position": "Giáo viên"
}
```
**Response:**
```json
{
  "id": 2,
  "image": "https://example.com/image2.jpg",
  "position": "Giáo viên"
}
```

### Cập nhật nhân sự (admin)
**PUT** `/api/staffs/2`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
```json
{
  "image": "https://example.com/image2.jpg",
  "position": "Trưởng phòng"
}
```
**Response:**
```json
{
  "id": 2,
  "image": "https://example.com/image2.jpg",
  "position": "Trưởng phòng"
}
```

### Xóa nhân sự (admin)
**DELETE** `/api/staffs/2`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
**Response:**
```json
{
  "message": "Đã xóa"
}
``` 
---

## Lưu ý
- Các API tạo/sửa/xóa (POST, PUT, DELETE) với khóa học, tuyển sinh, tin tức, tư vấn đều yêu cầu quyền admin (trừ gửi đăng ký tư vấn là user).
- Thêm header `Authorization: Bearer <JWT_TOKEN>` khi gọi các API cần xác thực.
- Dữ liệu trả về có thể thay đổi tùy theo dữ liệu thực tế trong database.

## 7. Quản lý Người dùng (Users)

### Đồng bộ thông tin người dùng Zalo
**POST** `/api/users/sync`
```json
{
  "id": "1234567890",
  "name": "Nguyễn Văn A",
  "avatar": "https://example.com/avatar.jpg",
  "email": "vana@example.com",
  "phone": "0987654321",
  "locale": "vi_VN",
  "metadata": {
    "extra": "Giá trị tự do"
  }
}
```
**Response:**
```json
{
  "created": true,
  "user": {
    "id": 1,
    "role": "user",
    "zaloId": "1234567890",
    "displayName": "Nguyễn Văn A",
    "avatar": "https://example.com/avatar.jpg",
    "email": "vana@example.com",
    "phone": "0987654321",
    "locale": "vi_VN",
    "lastSeenAt": "2024-09-19T10:05:30.000Z",
    "metadata": {
      "extra": "Giá trị tự do"
    },
    "createdAt": "2024-09-19T10:05:30.000Z",
    "updatedAt": "2024-09-19T10:05:30.000Z"
  }
}
```

### Lấy thông tin người dùng bằng zaloId
**GET** `/api/users/zalo/1234567890`
**Response:**
```json
{
  "user": {
    "id": 1,
    "role": "user",
    "zaloId": "1234567890",
    "displayName": "Nguyễn Văn A",
    "avatar": "https://example.com/avatar.jpg",
    "email": "vana@example.com",
    "phone": "0987654321",
    "locale": "vi_VN",
    "lastSeenAt": "2024-09-19T10:05:30.000Z",
    "metadata": {
      "extra": "Giá trị tự do"
    },
    "createdAt": "2024-09-19T10:05:30.000Z",
    "updatedAt": "2024-09-19T10:05:30.000Z"
  }
}
```

### Lấy thông tin người dùng bằng id nội bộ
**GET** `/api/users/1`
**Response:**
```json
{
  "user": {
    "id": 1,
    "role": "user",
    "zaloId": "1234567890",
    "displayName": "Nguyễn Văn A",
    "avatar": "https://example.com/avatar.jpg",
    "email": "vana@example.com",
    "phone": "0987654321",
    "locale": "vi_VN",
    "lastSeenAt": "2024-09-19T10:05:30.000Z",
    "metadata": {
      "extra": "Giá trị tự do"
    },
    "createdAt": "2024-09-19T10:05:30.000Z",
    "updatedAt": "2024-09-19T10:05:30.000Z"
  }
}
```


---

## 8. Quản lý Học sinh (Students)

### Admin - Tạo học sinh mới
**POST** `/api/students/admin`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "studentCode": "HS2025001",
  "name": "Nguyễn Văn B",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "phone": "0912345678",
  "class": "10A1",
  "school": "THPT ABC",
  "metadata": {}
}
```
**Response:**
```json
{
  "id": 1,
  "studentCode": "HS2025001",
  "parentId": null,
  "name": "Nguyễn Văn B",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "phone": "0912345678",
  "class": "10A1",
  "school": "THPT ABC",
  "claimedAt": null,
  "metadata": {},
  "createdAt": "2024-09-19T10:00:00.000Z",
  "updatedAt": "2024-09-19T10:00:00.000Z"
}
```

### Admin - Lấy danh sách tất cả học sinh
**GET** `/api/students/admin`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
**Response:**
```json
[
  {
    "id": 1,
    "studentCode": "HS2025001",
    "parentId": null,
    "name": "Nguyễn Văn B",
    "dateOfBirth": "2010-05-15",
    "gender": "male",
    "phone": "0912345678",
    "class": "10A1",
    "school": "THPT ABC",
    "claimedAt": null,
    "metadata": {},
    "createdAt": "2024-09-19T10:00:00.000Z",
    "updatedAt": "2024-09-19T10:00:00.000Z"
  }
]
```

### Admin - Cập nhật thông tin học sinh
**PUT** `/api/students/admin/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "name": "Nguyễn Văn B Updated",
  "dateOfBirth": "2010-05-16",
  "gender": "male",
  "phone": "0912345679",
  "class": "10A2",
  "school": "THPT XYZ"
}
```
**Response:**
```json
{
  "id": 1,
  "studentCode": "HS2025001",
  "parentId": null,
  "name": "Nguyễn Văn B Updated",
  "dateOfBirth": "2010-05-16",
  "gender": "male",
  "phone": "0912345679",
  "class": "10A2",
  "school": "THPT XYZ",
  "claimedAt": null,
  "metadata": {},
  "createdAt": "2024-09-19T10:00:00.000Z",
  "updatedAt": "2024-09-19T10:05:00.000Z"
}
```

### Admin - Xóa học sinh
**DELETE** `/api/students/admin/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
**Response:**
```json
{
  "message": "Đã xóa học sinh"
}
```

### Parent - Claim học sinh bằng mã
**POST** `/api/students/claim`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (parent)
```json
{
  "studentCode": "HS2025001"
}
```
**Response:**
```json
{
  "message": "Claim học sinh thành công",
  "student": {
    "id": 1,
    "studentCode": "HS2025001",
    "parentId": 5,
    "name": "Nguyễn Văn B",
    "dateOfBirth": "2010-05-15",
    "gender": "male",
    "phone": "0912345678",
    "class": "10A1",
    "school": "THPT ABC",
    "claimedAt": "2024-09-19T10:10:00.000Z",
    "metadata": {},
    "createdAt": "2024-09-19T10:00:00.000Z",
    "updatedAt": "2024-09-19T10:10:00.000Z"
  }
}
```

### Parent - Lấy danh sách con đã claim
**GET** `/api/students`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (parent)
**Response:**
```json
[
  {
    "id": 1,
    "studentCode": "HS2025001",
    "parentId": 5,
    "name": "Nguyễn Văn B",
    "dateOfBirth": "2010-05-15",
    "gender": "male",
    "phone": "0912345678",
    "class": "10A1",
    "school": "THPT ABC",
    "claimedAt": "2024-09-19T10:10:00.000Z",
    "metadata": {},
    "createdAt": "2024-09-19T10:00:00.000Z",
    "updatedAt": "2024-09-19T10:10:00.000Z"
  }
]
```

### Parent - Xem chi tiết học sinh
**GET** `/api/students/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (parent hoặc admin)
**Response:**
```json
{
  "id": 1,
  "studentCode": "HS2025001",
  "parentId": 5,
  "name": "Nguyễn Văn B",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "phone": "0912345678",
  "class": "10A1",
  "school": "THPT ABC",
  "claimedAt": "2024-09-19T10:10:00.000Z",
  "metadata": {},
  "createdAt": "2024-09-19T10:00:00.000Z",
  "updatedAt": "2024-09-19T10:10:00.000Z"
}
```

---

## 9. Quản lý Điểm danh (Attendances)

### Admin/Teacher - Tạo điểm danh
**POST** `/api/attendances`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "studentId": 1,
  "date": "2024-09-19",
  "status": "present",
  "note": "Đi học đúng giờ"
}
```
**Note:** `status` có thể là: `present`, `absent`, `late`, `excused`

**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "date": "2024-09-19",
  "status": "present",
  "note": "Đi học đúng giờ",
  "createdBy": 2,
  "createdAt": "2024-09-19T10:15:00.000Z",
  "updatedAt": "2024-09-19T10:15:00.000Z"
}
```

### Lấy danh sách điểm danh theo học sinh
**GET** `/api/attendances?studentId=1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
**Response:**
```json
[
  {
    "id": 1,
    "studentId": 1,
    "date": "2024-09-19",
    "status": "present",
    "note": "Đi học đúng giờ",
    "createdBy": 2,
    "createdAt": "2024-09-19T10:15:00.000Z",
    "updatedAt": "2024-09-19T10:15:00.000Z"
  },
  {
    "id": 2,
    "studentId": 1,
    "date": "2024-09-18",
    "status": "late",
    "note": "Đến muộn 10 phút",
    "createdBy": 2,
    "createdAt": "2024-09-18T10:15:00.000Z",
    "updatedAt": "2024-09-18T10:15:00.000Z"
  }
]
```

### Admin/Teacher - Cập nhật điểm danh
**PUT** `/api/attendances/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "status": "absent",
  "note": "Nghỉ có phép"
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "date": "2024-09-19",
  "status": "absent",
  "note": "Nghỉ có phép",
  "createdBy": 2,
  "createdAt": "2024-09-19T10:15:00.000Z",
  "updatedAt": "2024-09-19T10:20:00.000Z"
}
```

### Admin/Teacher - Xóa điểm danh
**DELETE** `/api/attendances/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
**Response:**
```json
{
  "message": "Đã xóa điểm danh"
}
```

---

## 10. Quản lý Điểm kiểm tra (Test Scores)

### Admin/Teacher - Tạo điểm kiểm tra
**POST** `/api/test-scores`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "studentId": 1,
  "testName": "Kiểm tra 15 phút - Toán",
  "subject": "Toán",
  "score": 8.5,
  "maxScore": 10,
  "testDate": "2024-09-19"
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "testName": "Kiểm tra 15 phút - Toán",
  "subject": "Toán",
  "score": 8.5,
  "maxScore": 10,
  "testDate": "2024-09-19",
  "createdBy": 2,
  "createdAt": "2024-09-19T10:25:00.000Z",
  "updatedAt": "2024-09-19T10:25:00.000Z"
}
```

### Lấy danh sách điểm kiểm tra theo học sinh
**GET** `/api/test-scores?studentId=1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
**Response:**
```json
[
  {
    "id": 1,
    "studentId": 1,
    "testName": "Kiểm tra 15 phút - Toán",
    "subject": "Toán",
    "score": 8.5,
    "maxScore": 10,
    "testDate": "2024-09-19",
    "createdBy": 2,
    "createdAt": "2024-09-19T10:25:00.000Z",
    "updatedAt": "2024-09-19T10:25:00.000Z"
  },
  {
    "id": 2,
    "studentId": 1,
    "testName": "Kiểm tra giữa kỳ - Văn",
    "subject": "Văn",
    "score": 7.0,
    "maxScore": 10,
    "testDate": "2024-09-15",
    "createdBy": 2,
    "createdAt": "2024-09-15T10:25:00.000Z",
    "updatedAt": "2024-09-15T10:25:00.000Z"
  }
]
```

### Admin/Teacher - Cập nhật điểm kiểm tra
**PUT** `/api/test-scores/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "testName": "Kiểm tra 15 phút - Toán (Updated)",
  "subject": "Toán",
  "score": 9.0,
  "maxScore": 10,
  "testDate": "2024-09-19"
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "testName": "Kiểm tra 15 phút - Toán (Updated)",
  "subject": "Toán",
  "score": 9.0,
  "maxScore": 10,
  "testDate": "2024-09-19",
  "createdBy": 2,
  "createdAt": "2024-09-19T10:25:00.000Z",
  "updatedAt": "2024-09-19T10:30:00.000Z"
}
```

### Admin/Teacher - Xóa điểm kiểm tra
**DELETE** `/api/test-scores/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
**Response:**
```json
{
  "message": "Đã xóa điểm kiểm tra"
}
```

---

## 11. Quản lý Nhận xét (Comments)

### Admin/Teacher - Tạo nhận xét chung
**POST** `/api/comments`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "studentId": 1,
  "content": "Em học tập chăm chỉ, cần cải thiện kỹ năng làm việc nhóm",
  "commentType": "general"
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "content": "Em học tập chăm chỉ, cần cải thiện kỹ năng làm việc nhóm",
  "commentType": "general",
  "testScoreId": null,
  "createdBy": 2,
  "createdAt": "2024-09-19T10:35:00.000Z",
  "updatedAt": "2024-09-19T10:35:00.000Z"
}
```

### Admin/Teacher - Tạo nhận xét sau bài kiểm tra
**POST** `/api/comments`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "studentId": 1,
  "content": "Bài làm tốt, cần chú ý phần giải phương trình",
  "commentType": "test_related",
  "testScoreId": 1
}
```
**Response:**
```json
{
  "id": 2,
  "studentId": 1,
  "content": "Bài làm tốt, cần chú ý phần giải phương trình",
  "commentType": "test_related",
  "testScoreId": 1,
  "createdBy": 2,
  "createdAt": "2024-09-19T10:40:00.000Z",
  "updatedAt": "2024-09-19T10:40:00.000Z"
}
```

### Lấy danh sách nhận xét theo học sinh
**GET** `/api/comments?studentId=1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
**Response:**
```json
[
  {
    "id": 2,
    "studentId": 1,
    "content": "Bài làm tốt, cần chú ý phần giải phương trình",
    "commentType": "test_related",
    "testScoreId": 1,
    "createdBy": 2,
    "createdAt": "2024-09-19T10:40:00.000Z",
    "updatedAt": "2024-09-19T10:40:00.000Z"
  },
  {
    "id": 1,
    "studentId": 1,
    "content": "Em học tập chăm chỉ, cần cải thiện kỹ năng làm việc nhóm",
    "commentType": "general",
    "testScoreId": null,
    "createdBy": 2,
    "createdAt": "2024-09-19T10:35:00.000Z",
    "updatedAt": "2024-09-19T10:35:00.000Z"
  }
]
```

### Admin/Teacher - Cập nhật nhận xét
**PUT** `/api/comments/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
```json
{
  "content": "Em học tập rất chăm chỉ, cần cải thiện kỹ năng làm việc nhóm và giao tiếp",
  "commentType": "general"
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "content": "Em học tập rất chăm chỉ, cần cải thiện kỹ năng làm việc nhóm và giao tiếp",
  "commentType": "general",
  "testScoreId": null,
  "createdBy": 2,
  "createdAt": "2024-09-19T10:35:00.000Z",
  "updatedAt": "2024-09-19T10:45:00.000Z"
}
```

### Admin/Teacher - Xóa nhận xét
**DELETE** `/api/comments/1`
**Headers:** `Authorization: Bearer <JWT_TOKEN>` (admin)
**Response:**
```json
{
  "message": "Đã xóa nhận xét"
}
```
