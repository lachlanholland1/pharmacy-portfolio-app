const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function sendMail(subject, html, fromEmail, fromFirstName, fromLastName, to) {
  if (fromFirstName == null) {
    from = `"" <${fromEmail}>`;
  } else {
    from = `"${fromFirstName} ${fromLastName}" <${fromEmail}>`;
  }
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: `"${fromFirstName}" <${fromEmail}>`,
      to: to,
      subject: subject,
      html: html,
      replyTo: fromEmail,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.response);
    });
  });
}

module.exports = sendMail;
