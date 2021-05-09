// .env file path had to be specified to the root directory
require("dotenv").config({ path: "../.env" });
const qrcode = require("qrcode")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: process.env.EMAILER,
        pass: process.env.EMAILER_PASS
    }
});

// sending this to myself for the time being
const createEmail = async () => {
    try {
        const mailer = await transporter.sendMail({
            from: process.env.EMAILER,
            to: process.env.EMAILER,
            subject: "Hello World!",
            html: "<b>Hello world?</b>"
        });
        console.log("Message sent: %s", mailer.messageId);
    } catch (err) {
        console.log(err);
    }
};    

createEmail();