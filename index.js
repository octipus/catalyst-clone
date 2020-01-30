require('dotenv').config();
const path = require("path");
const express = require("express");
const nodeMailer = require("nodemailer");
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || "8000";

app.use(express.static(path.join(__dirname, "public")));

//contact form handler
app.use(bodyParser.urlencoded({extended: true}));

app.post('/send-email', function (req, res) {

  var body = req.body;
  var name = body.name;
  var email = body.email;
  var social = body.social;
  var message = body.message;

  var composedMessage = {
      text: 'Hey Dan!\n\n' +
        `${name} has contacted you through your website. Here is their contact information and message: \n\n` +
        `Name: ${name} \n` +
        `Email Address: ${email} \n` +
        `Social: ${social} \n` +
        `Message: ${message} \n\n`,
      subject: 'Website Contact Form'
    };

  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: process.env.USER,
          pass: process.env.KEY
      }
  });

  transporter.sendMail({
      from: `${name}`,
      to: 'octavian@justcatalyst.com',
      subject: composedMessage.subject,
      text: composedMessage.text
    }, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        res.redirect("contact");
      }
    });

});


// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});



app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
