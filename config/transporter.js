require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");

const transporter = new nodemailer.createTransport({
    host: "smtp.office365.com",
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: process.env.EMAILER,
        pass: process.env.EMAILER_PASS
    }
});

module.exports = transporter;