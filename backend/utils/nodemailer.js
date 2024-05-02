const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "phritik06@gmail.com",
    pass: "gobqaftqklmqwtit",
  },
});

const sendWelcomeEmail = (email) => {
  const mailOptions = {
    from: "phritik@gmail.com",
    to: "phritik@gmail.com",
    subject: "Welcome to Our App!",
    text: "Thank you for registering with us. We are excited to have you on board!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending welcome email:", error.message);
    } else {
      console.log("Welcome email sent:", info.response);
    }
  });
};

// sendWelcomeEmail();