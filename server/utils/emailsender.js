const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const send_mail = async (recipient, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: recipient,
    subject: subject,
    html: htmlContent,
  };
  try{
    await transporter.sendMail(mailOptions);
  } catch (e) {}
}

module.exports = {
  send_mail,
}