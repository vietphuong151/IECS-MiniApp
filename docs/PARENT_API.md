# API cho Phụ Huynh (Parents)

Tài liệu này mô tả các API endpoints cho phụ huynh để quản lý và theo dõi thông tin học sinh của mình.

---

## Xác thực (Authentication)

Tất cả các API dưới đây đều yêu cầu authentication bằng JWT token (trừ API đăng ký và đăng nhập).

**Header cần thiết:**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 1. Nhận quyền xem thông tin học sinh (Claim Student)

Phụ huynh sử dụng mã học sinh để nhận quyền xem thông tin con em.

**POST** `/api/students/claim`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "studentCode": "HS2025001"
}
```

**Response - Success (200):**
```json
{
  "message": "Đã nhận quyền xem thông tin học sinh thành công",
  "student": {
    "id": 3,
    "studentCode": "HS2025001",
    "name": "Nguyễn Thành Duy",
    "dateOfBirth": "2010-05-15",
    "gender": "male",
    "phone": "0912345678",
    "class": "BTO1",
    "school": "Bình Thạnh",
    "claimedAt": "2025-02-02T10:30:00.000Z"
  }
}
```

**Response - Error (404):**
```json
{
  "error": "Không tìm thấy học sinh với mã này"
}
```

**Response - Error (400):**
```json
{
  "error": "Học sinh này đã được nhận bởi phụ huynh khác"
}
```

---

## 2. Lấy danh sách học sinh của phụ huynh

Lấy danh sách tất cả học sinh mà phụ huynh đã claim.

**GET** `/api/students/my-students`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Response - Success (200):**
```json
{
  "students": [
    {
      "id": 3,
      "studentCode": "HS2025001",
      "name": "Nguyễn Thành Duy",
      "dateOfBirth": "2010-05-15",
      "gender": "male",
      "phone": "0912345678",
      "class": "BTO1",
      "school": "Bình Thạnh",
      "claimedAt": "2025-02-02T10:30:00.000Z"
    },
    {
      "id": 5,
      "studentCode": "HS2025002",
      "name": "Nguyễn Minh An",
      "dateOfBirth": "2012-08-20",
      "gender": "female",
      "phone": "0912345678",
      "class": "BTO2",
      "school": "Bình Thạnh",
      "claimedAt": "2025-02-01T14:20:00.000Z"
    }
  ]
}
```

---

## 3. Xem thông tin chi tiết học sinh

Lấy thông tin chi tiết của một học sinh cụ thể.

**GET** `/api/students/:id`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**URL Parameters:**
- `id`: ID của học sinh (ví dụ: 3)

**Response - Success (200):**
```json
{
  "id": 3,
  "studentCode": "HS2025001",
  "name": "Nguyễn Thành Duy",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "phone": "0912345678",
  "class": "BTO1",
  "school": "Bình Thạnh",
  "metadata": {},
  "claimedAt": "2025-02-02T10:30:00.000Z",
  "createdAt": "2025-01-15T08:00:00.000Z",
  "updatedAt": "2025-02-02T10:30:00.000Z"
}
```

**Response - Error (403):**
```json
{
  "error": "Bạn không có quyền xem thông tin học sinh này"
}
```

---

## 4. Xem điểm danh của học sinh

Lấy lịch sử điểm danh của học sinh.

**GET** `/api/attendances/student/:studentId`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**URL Parameters:**
- `studentId`: ID của học sinh (ví dụ: 3)

**Query Parameters (Optional):**
- `startDate`: Ngày bắt đầu (format: YYYY-MM-DD)
- `endDate`: Ngày kết thúc (format: YYYY-MM-DD)

**Ví dụ:** `/api/attendances/student/3?startDate=2025-01-01&endDate=2025-01-31`

**Response - Success (200):**
```json
{
  "attendances": [
    {
      "id": 1,
      "studentId": 3,
      "date": "2025-02-01",
      "status": "present",
      "note": null,
      "createdBy": 2,
      "createdAt": "2025-02-01T08:00:00.000Z",
      "updatedAt": "2025-02-01T08:00:00.000Z"
    },
    {
      "id": 2,
      "studentId": 3,
      "date": "2025-02-02",
      "status": "late",
      "note": "Đi học trễ 20 phút",
      "createdBy": 2,
      "createdAt": "2025-02-02T08:20:00.000Z",
      "updatedAt": "2025-02-02T08:20:00.000Z"
    },
    {
      "id": 3,
      "studentId": 3,
      "date": "2025-02-03",
      "status": "absent",
      "note": "Nghỉ có phép",
      "createdBy": 2,
      "createdAt": "2025-02-03T08:00:00.000Z",
      "updatedAt": "2025-02-03T08:00:00.000Z"
    }
  ],
  "summary": {
    "total": 3,
    "present": 1,
    "late": 1,
    "absent": 1,
    "excused": 0
  }
}
```

**Trạng thái điểm danh (status):**
- `present`: Có mặt
- `absent`: Vắng mặt
- `late`: Đi trễ
- `excused`: Có phép

---

## 5. Xem điểm kiểm tra của học sinh

Lấy danh sách điểm kiểm tra của học sinh.

**GET** `/api/test-scores/student/:studentId`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**URL Parameters:**
- `studentId`: ID của học sinh (ví dụ: 3)

**Query Parameters (Optional):**
- `subject`: Lọc theo môn học
- `startDate`: Ngày bắt đầu (format: YYYY-MM-DD)
- `endDate`: Ngày kết thúc (format: YYYY-MM-DD)

**Ví dụ:** `/api/test-scores/student/3?subject=Tiếng Đức A1`

**Response - Success (200):**
```json
{
  "testScores": [
    {
      "id": 1,
      "studentId": 3,
      "testName": "Kiểm tra giữa kỳ",
      "subject": "Tiếng Đức A1",
      "score": 8.5,
      "maxScore": 10,
      "testDate": "2025-02-01",
      "createdBy": 2,
      "createdAt": "2025-02-01T15:30:00.000Z",
      "updatedAt": "2025-02-01T15:30:00.000Z"
    },
    {
      "id": 2,
      "studentId": 3,
      "testName": "Kiểm tra cuối kỳ",
      "subject": "Tiếng Đức A1",
      "score": 9.0,
      "maxScore": 10,
      "testDate": "2025-02-15",
      "createdBy": 2,
      "createdAt": "2025-02-15T16:00:00.000Z",
      "updatedAt": "2025-02-15T16:00:00.000Z"
    }
  ],
  "summary": {
    "total": 2,
    "averageScore": 8.75,
    "highestScore": 9.0,
    "lowestScore": 8.5
  }
}
```

---

## 6. Xem nhận xét của học sinh

Lấy danh sách nhận xét về học sinh từ giáo viên.

**GET** `/api/comments/student/:studentId`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**URL Parameters:**
- `studentId`: ID của học sinh (ví dụ: 3)

**Query Parameters (Optional):**
- `commentType`: Lọc theo loại nhận xét (`general` hoặc `test_related`)

**Ví dụ:** `/api/comments/student/3?commentType=general`

**Response - Success (200):**
```json
{
  "comments": [
    {
      "id": 1,
      "studentId": 3,
      "content": "Em đã có tiến bộ rõ rệt trong việc học ngữ pháp tiếng Đức",
      "commentType": "general",
      "testScoreId": null,
      "createdBy": 2,
      "createdAt": "2025-02-01T10:00:00.000Z",
      "updatedAt": "2025-02-01T10:00:00.000Z",
      "creator": {
        "id": 2,
        "username": "Admin",
        "role": "admin"
      }
    },
    {
      "id": 2,
      "studentId": 3,
      "content": "Cần ôn lại phần động từ bất quy tắc",
      "commentType": "test_related",
      "testScoreId": 1,
      "createdBy": 2,
      "createdAt": "2025-02-01T15:45:00.000Z",
      "updatedAt": "2025-02-01T15:45:00.000Z",
      "creator": {
        "id": 2,
        "username": "Admin",
        "role": "admin"
      },
      "testScore": {
        "id": 1,
        "testName": "Kiểm tra giữa kỳ",
        "subject": "Tiếng Đức A1",
        "score": 8.5,
        "maxScore": 10,
        "testDate": "2025-02-01"
      }
    }
  ]
}
```

**Loại nhận xét (commentType):**
- `general`: Nhận xét chung
- `test_related`: Nhận xét liên quan đến bài kiểm tra

---

## Lưu ý

1. **Authentication**: Tất cả các endpoints đều yêu cầu JWT token trong header `Authorization`.

2. **Authorization**: Phụ huynh chỉ có thể xem thông tin của học sinh mà họ đã claim. Nếu cố gắng truy cập thông tin học sinh khác, API sẽ trả về lỗi 403.

3. **Mã học sinh (studentCode)**: Là mã duy nhất để nhận diện học sinh, được cấp bởi trung tâm.

4. **Date Format**: Tất cả ngày tháng đều sử dụng format ISO 8601 (`YYYY-MM-DD` hoặc `YYYY-MM-DDTHH:mm:ss.sssZ`).

5. **Pagination**: Các endpoint có thể được mở rộng với pagination trong tương lai nếu dữ liệu quá lớn.

---

## Ví dụ sử dụng với JavaScript (Fetch API)

### Claim học sinh
```javascript
const claimStudent = async (studentCode, token) => {
  const response = await fetch('http://localhost:5000/api/students/claim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ studentCode })
  });
  
  const data = await response.json();
  return data;
};
```

### Lấy danh sách học sinh
```javascript
const getMyStudents = async (token) => {
  const response = await fetch('http://localhost:5000/api/students/my-students', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data;
};
```

### Xem điểm danh
```javascript
const getAttendances = async (studentId, token, startDate, endDate) => {
  let url = `http://localhost:5000/api/attendances/student/${studentId}`;
  
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data;
};
```

### Xem điểm kiểm tra
```javascript
const getTestScores = async (studentId, token, subject) => {
  let url = `http://localhost:5000/api/test-scores/student/${studentId}`;
  
  if (subject) {
    url += `?subject=${encodeURIComponent(subject)}`;
  }
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data;
};
```

### Xem nhận xét
```javascript
const getComments = async (studentId, token) => {
  const response = await fetch(`http://localhost:5000/api/comments/student/${studentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data;
};
```
