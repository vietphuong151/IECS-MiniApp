# Hướng dẫn tích hợp Google Sheets

## Tổng quan
Khi user đăng ký tư vấn, dữ liệu sẽ được lưu vào:
1. ✅ **Database** (PostgreSQL) - Nguồn dữ liệu chính
2. ✅ **Google Sheet** - Backup và báo cáo cho team

## Cách setup

### Bước 1: Chuẩn bị Google Sheet

1. Tạo hoặc mở Google Sheet công ty
2. Tạo sheet với tên `Sheet1` (hoặc tên khác, sẽ sửa trong code)
3. Thêm header ở dòng đầu tiên:

| Timestamp | Name | Email | Phone | Consultation Date | Message | Status |
|-----------|------|-------|-------|------------------|---------|--------|

### Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, vào **Extensions** → **Apps Script**
2. Xóa code mẫu và paste code sau:

```javascript
function doPost(e) {
  try {
    // Lấy sheet (đổi tên 'Sheet1' nếu cần)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    
    // Parse data từ request
    const data = JSON.parse(e.postData.contents);
    
    // Thêm dòng mới: [Timestamp, Name, Email, Phone, Date, Message, Status]
    sheet.appendRow([
      new Date(), // Timestamp
      data.name,
      data.email,
      data.phone,
      data.consultation_date,
      data.message,
      data.status || 'pending'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Đã lưu vào Sheet'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save**

### Bước 3: Deploy Web App

1. Click **Deploy** → **New deployment**
2. Click icon ⚙️ bên cạnh "Select type" → Chọn **Web app**
3. Cấu hình:
   - **Description**: `IECS Consultation Sync v1`
   - **Execute as**: **Me** (email của bạn)
   - **Who has access**: **Anyone** (không cần đăng nhập)
4. Click **Deploy**
5. Authorize quyền truy cập (chọn tài khoản, cho phép)
6. **Copy Web App URL** (dạng: `https://script.google.com/macros/s/AKfycby.../exec`)

### Bước 4: Cấu hình Backend

1. Mở file `.env` trong backend
2. Thêm dòng:
```env
GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart backend:
```bash
npm run dev
# hoặc
npm start
```

### Bước 5: Test

1. Từ Mini App, đăng ký tư vấn thử
2. Kiểm tra:
   - ✅ Database có record mới
   - ✅ Google Sheet có dòng mới

## Xử lý lỗi

### Nếu Sheet không nhận được data:

1. **Kiểm tra Web App URL** trong `.env` có đúng không
2. **Kiểm tra quyền**: Web App phải chọn "Anyone" ở "Who has access"
3. **Xem log backend**: Tìm dòng `Sheet sync failed:` 
4. **Test Web App trực tiếp**:
   ```bash
   curl -X POST YOUR_WEB_APP_URL \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","phone":"0123456789","consultation_date":"2025-09-30","message":"Test","status":"pending"}'
   ```

### Nếu Apps Script báo lỗi permission:

1. Vào Apps Script Editor
2. Click **Run** → Chọn hàm `doPost`
3. Authorize lại quyền truy cập

## Bảo mật

✅ **An toàn:**
- Web App URL có token bảo mật tích hợp
- Chỉ backend biết URL này (không lộ ra frontend)
- Service Account không cần thiết
- Sheet chỉ nhận POST request từ backend

✅ **Giới hạn quyền:**
- Apps Script chỉ có quyền ghi vào 1 Sheet cụ thể
- Không access toàn bộ Google Drive

## Lưu ý

- Nếu không cấu hình `GOOGLE_SHEET_WEB_APP_URL`, tính năng tự động bỏ qua (không lỗi)
- Database luôn là ưu tiên - nếu Sheet lỗi, data vẫn lưu DB thành công
- Sheet là backup/báo cáo, không phải nguồn dữ liệu chính

## Troubleshooting

| Vấn đề | Giải pháp |
|--------|-----------|
| Sheet không nhận data | Kiểm tra Web App URL, deploy lại với "Anyone" access |
| Backend báo timeout | Apps Script có thể chậm, tăng timeout lên 10s |
| Data bị duplicate | Có thể do retry, kiểm tra log backend |
| Sheet không tìm thấy | Sửa tên sheet trong Apps Script code |

## Nâng cao

### Format dữ liệu trong Sheet

Có thể custom Apps Script để:
- Format ngày giờ theo múi giờ Việt Nam
- Thêm conditional formatting (màu sắc theo status)
- Gửi email thông báo khi có đăng ký mới
- Tạo summary chart

### Ví dụ format ngày:

```javascript
// Trong hàm doPost()
const vnDate = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
sheet.appendRow([
  vnDate, // Thay vì new Date()
  data.name,
  // ...
]);
```
