const createDOMPurify = require('dompurify')
const JSDOM = require('jsdom').JSDOM;

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

module.exports = (order) => {
  return `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <h1>Order confirmation ${DOMPurify.sanitize(order.code)}</h1>
        <p>Thank you for your order.</p>
        <p><strong>Delivery: ${DOMPurify.sanitize(order.deliveryDate.toDateString())}</strong>.</p>
        <table style="width: 100%;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
          ${order.items.map(item => {
            const formatter = Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
              maximumFractionDigits: 2
            });

            const subtotal = formatter.format(item.quantity * item.price);
            const price = formatter.format(item.price);

            return `
              <tr>
                <td>${DOMPurify.sanitize(item.name)}</td>
                <td>${DOMPurify.sanitize(item.quantity)}</td>
                <td>${DOMPurify.sanitize(price)}</td>
                <td>${DOMPurify.sanitize(subtotal)}</td>
              </tr>
            `
          }).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
}