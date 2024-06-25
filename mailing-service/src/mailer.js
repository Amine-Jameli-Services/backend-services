const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD
    }
});

const readTemplate = (templateName) => {
    const filePath = path.join(__dirname, '..', '..', 'templates', `${templateName}.hbs`);
    console.log(`Reading template file from: ${filePath}`);
    if (!fs.existsSync(filePath)) {
        console.error(`Template file ${filePath} does not exist`);
        throw new Error(`Template file ${filePath} does not exist`);
    }
    const source = fs.readFileSync(filePath, 'utf-8');
    return hbs.compile(source);
};

const sendEmail = async (to, subject, templateName, context) => {
    try {
        const template = readTemplate(templateName);
        const htmlToSend = template(context);
        await transporter.sendMail({
            from: `"Your Company" <${process.env.ZOHO_EMAIL}>`,
            to: to,
            subject: subject,
            html: htmlToSend
        });
    } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
        throw error;
    }
};

module.exports = sendEmail;
