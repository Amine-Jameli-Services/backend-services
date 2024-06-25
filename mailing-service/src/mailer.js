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
    const filePath = path.resolve(__dirname, 'templates', `${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf-8');
    return hbs.compile(source);
};

const sendEmail = async (to, subject, templateName, context) => {
    const template = readTemplate(templateName);
    const htmlToSend = template(context);
    await transporter.sendMail({
        from: `"Amine Jameli Services" <contact@aminejameli.tn>`,
        to: to,
        subject: subject,
        html: htmlToSend
    });
};

module.exports = sendEmail;
