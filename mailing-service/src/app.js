const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./mailer');

const app = express();
app.use(bodyParser.json());

app.post('/sendOrderConfirmation', async (req, res) => {
  const { to, orderCode, trackingLink } = req.body;
  try {
    await sendEmail(to, 'Order Confirmation', 'orderConfirmation', { orderCode, trackingLink });
    res.send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.post('/sendStatusUpdate', async (req, res) => {
    const { to, status, details } = req.body;
    try {
        await sendEmail(to, 'Order Status Update', 'statusUpdate', { status, details });
        res.send('Status update email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send status update email: ' + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
