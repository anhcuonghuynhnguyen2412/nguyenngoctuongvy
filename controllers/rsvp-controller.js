// Load environment variables
require('dotenv').config();

const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to handle RSVP form submission
exports.processRSVP = (req, res) => {
  const formData = req.body;
  console.log('RSVP submission received:', formData);
  
  // Create email content for the guest who submitted the form
  const guestEmailContent = `
    <div style="font-family: 'Montaga', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #6B9080; border-radius: 10px;">
      <h2 style="color: #6B9080; text-align: center;">Xác nhận tham dự lễ tốt nghiệp</h2>
      <p>Xin chào <strong>${formData.name}</strong>,</p>
      <p>Cảm ơn bạn đã phản hồi lời mời tham dự lễ tốt nghiệp của mình.</p>
      <p><strong>Trạng thái tham dự:</strong> ${formData.attending === 'yes' ? 'Xác nhận tham dự' : 'Không thể tham dự'}</p>
      ${formData.attending === 'yes' ? `<p><strong>Món không ăn được:</strong> ${formData.dinner || 'Chưa chọn'}</p>` : ''}
      ${formData.message ? `<p><strong>Lời nhắn của bạn:</strong> ${formData.message}</p>` : ''}
      <div style="margin-top: 30px; text-align: center;">
        <p>Thông tin chi tiết về sự kiện:</p>
        <p><strong>Thời gian:</strong> Thứ Năm, ngày 03 tháng 07, 2025</p>
        <p><strong>Địa điểm:</strong> Nhà hát Bến Thành</p>
        <p><strong>Địa chỉ:</strong> Số 06 Mạc Đĩnh Chi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
      </div>
      <p style="text-align: center; margin-top: 30px;">Rất mong được gặp bạn tại sự kiện!</p>
      <p style="text-align: center; font-style: italic;">Mỹ Nhi</p>
    </div>
  `;

  // Email options for the guest
  const guestMailOptions = {
    from: process.env.EMAIL_USER, // Sẽ hiển thị là người gửi
    to: formData.email, // Gửi đến email người điền form
    subject: 'Xác nhận tham dự lễ tốt nghiệp',
    html: guestEmailContent
  };

  // Also create a notification email to yourself (optional)
  const ownerEmailContent = `
    <h2>Có người phản hồi lời mời tốt nghiệp</h2>
    <p><strong>Họ và tên:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Tham dự:</strong> ${formData.attending === 'yes' ? 'Có' : 'Không'}</p>
    <p><strong>Không ăn được:</strong> ${formData.dinner || 'Không chọn'}</p>
    <p><strong>Lời nhắn:</strong> ${formData.message || 'Không có'}</p>
    <p><em>Gửi từ website vào lúc ${new Date().toLocaleString('vi-VN')}</em></p>
  `;

  // Email options for yourself (optional)
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Gửi cho chính bạn để theo dõi
    subject: `RSVP từ ${formData.name}`,
    html: ownerEmailContent
  };

  // Send email to the guest
  transporter.sendMail(guestMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email to guest:', error);
      res.json({
        success: false,
        message: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.'
      });
    } else {
      console.log('Email sent to guest:', info.response);
      
      // Also send notification to yourself (optional)
      transporter.sendMail(ownerMailOptions, (ownerError, ownerInfo) => {
        if (ownerError) {
          console.error('Error sending notification email:', ownerError);
        } else {
          console.log('Notification email sent:', ownerInfo.response);
        }
      });
      
      res.json({
        success: true,
        message: 'Thông tin đã được gửi thành công. Cảm ơn bạn đã phản hồi!'
      });
    }
  });
};