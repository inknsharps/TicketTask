// This utils file basically contains all the functions that we need to generate a QR Code, make a new email template, and finally use the transporter from nodemailer to send the message.

// .env file path had to be specified to the root directory
require("dotenv").config({ path: "../.env" });
const QRCode = require("qrcode");
const transporter = require("../config/transporter");

const createEmailTemplate = (generatedQRCode) => {
    const newEmailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <style>
    
        </style>
    </head>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <table role="presentation" border="1" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td>
                    <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                        <tr>
                            <td bgcolor="#Ff9800" style="padding: 10vh;">
                                <div style="display: flex; flex-wrap: wrap; flex-direction: column; align-content: center">
                                    <p style="margin: 0; font-size: 34px;">TICKETTASK</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 10vh; display: flex; flex-direction: column;">
                                <img src="${generatedQRCode}">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p align="center">Please present this ticket upon entry.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ee4c50" style="padding: 10vh">
                                <div style="display: flex; flex-wrap: wrap; flex-direction: column; align-content: center">
                                    <p style="margin: 0;">Copyright 2021</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`
    return new Promise((resolve, reject) => {
        resolve(newEmailTemplate);
        reject(new Error(`As Clay Davis would say, aww sheeeeeeeeeeeeeeit.`));
    }) 
}; 

const generateQRCode = async (url) => {
    try {
        const newQRCodeURL = await QRCode.toDataURL(url);
        return newQRCodeURL;
    } catch (err) {
        console.log(err);
    }
};

// This currently send to yourself at the moment for testing.
const createEmail = async (url, event, recipient) => {
    try {
        const newQRCode = await generateQRCode(url);
        const message = await createEmailTemplate(newQRCode);
        const mailer = await transporter.sendMail({
            from: process.env.EMAILER,
            to: process.env.EMAILER,
            subject: `Ticket for ${event}!`,
            html: message
        });
        console.log("Message sent: %s", mailer.messageId);
    } catch (err) {
        console.log(err);
    }
};    

module.exports = {
    createEmail,
    createEmailTemplate,
    generateQRCode,
};