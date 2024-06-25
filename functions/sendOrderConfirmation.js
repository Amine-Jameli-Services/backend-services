const sendEmail = require('../mailing-service/src/mailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { to, orderCode, trackingLink } = JSON.parse(event.body);
    try {
        await sendEmail(to, 'Order Confirmation', 'orderConfirmation', { orderCode, trackingLink });
        return { statusCode: 200, body: 'Email sent successfully' };
    } catch (error) {
        return { statusCode: 500, body: 'Failed to send email: ' + error.message };
    }
};
