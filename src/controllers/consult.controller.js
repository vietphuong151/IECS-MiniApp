const Consult = require('../models/consult.model');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { appendConsultationToSheet } = require('../services/googleSheets.service');
dayjs.extend(customParseFormat);

// Tạo mới tư vấn
exports.create = async (req, res) => {
  try {
    const { name, email, phone, message, consultation_date } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!name || !email || !phone || !message || !consultation_date) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    // Validate ngày theo format YYYY-MM-DD
    const d = dayjs(consultation_date, 'YYYY-MM-DD', true);
    if (!d.isValid()) {
      return res.status(400).json({ message: 'Ngày hẹn không hợp lệ (YYYY-MM-DD)' });
    }

    const consult = await Consult.create({
      name,
      email,
      phone,
      message,
      consultation_date: d.format('YYYY-MM-DD'), // DATEONLY nên lưu string YYYY-MM-DD
    });

    // Đồng bộ lên Google Sheet (không chờ, không ảnh hưởng response)
    appendConsultationToSheet({
      name: consult.name,
      email: consult.email,
      phone: consult.phone,
      consultation_date: consult.consultation_date,
      message: consult.message,
      status: consult.status,
    }).catch(err => console.error('Sheet sync failed:', err));

    res.status(201).json({ message: 'Đăng ký tư vấn thành công', consult });
  } catch (err) {
    console.error('Create consult error:', err);
    res.status(500).json({ message: 'Lỗi đăng ký', error: err.message });
  }
};

// Lấy tất cả tư vấn
exports.getAll = async (req, res) => {
  try {
    const consults = await Consult.findAll({ order: [['createdAt', 'DESC']] });
    res.json(consults);
  } catch (err) {
    console.error('Get all consults error:', err);
    res.status(500).json({ message: 'Lỗi lấy danh sách', error: err.message });
  }
};

// Cập nhật trạng thái
exports.updateStatus = async (req, res) => {
  try {
    const consult = await Consult.findByPk(req.params.id);
    if (!consult) {
      return res.status(404).json({ message: 'Không tìm thấy tư vấn' });
    }

    consult.status = req.body.status;
    await consult.save();

    res.json({ message: 'Cập nhật trạng thái thành công', consult });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ message: 'Lỗi cập nhật', error: err.message });
  }
};

// Lấy danh sách ngày đã đặt (pending/confirmed)
exports.getBookedDates = async (req, res) => {
  try {
    const bookedConsults = await Consult.findAll({
      where: {
        status: ['pending', 'confirmed'],
      },
      attributes: ['consultation_date'],
      raw: true, // trả về object thuần { consultation_date: '2025-09-20' }
    });

    const bookedDates = bookedConsults.map(c => c.consultation_date);
    res.json({ bookedDates });
  } catch (err) {
    console.error('Get booked dates error:', err);
    res.status(500).json({ message: 'Lỗi lấy danh sách ngày đã đặt', error: err.message });
  }
};
