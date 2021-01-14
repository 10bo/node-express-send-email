# What is this project?

This is an example of how an order confirmation can be sent from a Node express
server.

This project was initially created using the express-generator package.

# How to run the server

* Run `npm install`
* Create file /.env and fill out your SMTP details
	```
	EMAIL_HOST="smtp.example.com"
	EMAIL_PORT="2000"
	EMAIL_USER="user"
	EMAIL_PASS="pass"
	```
* Run `npm run start`
* Visit http://localhost:3000/ to see the greeting page

# How to send an email

Create a POST request with `Content-Type: application/json` header. The body of
the request should be a JSON object with a 'to' property storing the recipient
email address.

## Bash example

```bash
curl --location --request POST 'localhost:3000/mail/send/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to": "callum@tennant.io"
}'
```

## JavaScript example

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"to":"callum@tennant.io"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/mail/send/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```