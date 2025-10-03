const axios = require('axios');

const SHEET_WEB_APP_URL = process.env.GOOGLE_SHEET_WEB_APP_URL;

/**
 * Gửi dữ liệu tư vấn lên Google Sheet thông qua Apps Script Web App
 * @param {Object} data - Dữ liệu tư vấn {name, email, phone, message, consultation_date, status}
 */
exports.appendConsultationToSheet = async (data) => {
  if (!SHEET_WEB_APP_URL) {
    console.warn('⚠️  GOOGLE_SHEET_WEB_APP_URL not configured, skipping Sheet sync');
    return;
  }

  try {
    const response = await axios.post(SHEET_WEB_APP_URL, data, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ Synced to Google Sheet:', response.data);
  } catch (error) {
    console.error('❌ Failed to sync to Google Sheet:', error.message);
    // Không throw error để không ảnh hưởng đến việc lưu DB
    // DB là nguồn dữ liệu chính, Sheet chỉ là backup/báo cáo
  }
};
