const express = require('express')
const getOrderConfirmationHtml = require('../email-templates/getOrderConfirmationHtml');
const getNodemailerTransport = require('../functions/getNodemailerTransport');

var router = express.Router();

module.exports = router.post('/send/', (req, res, next) => {
  const order = {
    code: 5101,
    deliveryDate: new Date(),
    confirmationDate: new Date(),
    items: [
      { name: 'Carrot', quantity: 2.00, price: 0.50 },
      { name: 'Tomato', quantity: 4.00, price: 0.40 },
      { name: 'Celery', quantity: 3.00, price: 0.30 }
    ]
  };

  const to = req.body.to;
  const from = 'test@test.com';
  const subject = 'Order confirmation';
  const html = getOrderConfirmationHtml(order);

  const mail = { to, from, subject, html };
  const transport = getNodemailerTransport();
  transport.sendMail(mail);

  res.json({
    success: true
  });
})