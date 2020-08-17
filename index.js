require('dotenv').config();
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');
const bodyParser = require('body-parser');
const https = require('https')
const http = require('http');
const fs = require('fs')


const compression = require('compression');
const helmet = require('helmet');
const robots = require('express-robots-txt');
const expressSitemapXml = require('express-sitemap-xml')

const app = express();


app.use(helmet());
app.use(robots({UserAgent: '*', Disallow: '/public/media', CrawlDelay: '120', Sitemap: 'http://justcatalyst.org/sitemap.xml'}))
app.use(expressSitemapXml(getUrls, 'http://justcatalyst.org/sitemap.xml'))

async function getUrls () {
  return await getUrlsFromDatabase()
}

const httpPort = process.env.HTTP || "80";
const httpsPort = process.env.HTTPS || "443";


/////////////////////   CONTACT FORM HANDLER  /////////////////////

app.use(bodyParser.urlencoded({extended: true}));

var options = {
  service: 'SendGrid',
  auth: {
    api_user: process.env.USER,
    api_key: process.env.SENDGRID_API_KEY
  }
}

//use real deta until fix .env on ubuntu

var client = nodemailer.createTransport(sgTransport(options));

app.post('/send-email', function (req, res) {

  var body = req.body;
  var name = body.name;
  var email = body.email;
  var social = body.social;
  var message = body.message;
  var service = body.service;

  var composedMessage = {
      from: 'website@justcatalyst.com',
      to: 'octavian@justcatalyst.com',
      text: 'Hey Dan!\n\n' +
        `${name} has contacted you through your website. Here is their contact information and message: \n\n` +
        `Name: ${name} \n` +
        `Email Address: ${email} \n` +
        `Social: ${social} \n` +
        `Message: ${message} \n` +
        `Service: ${service} \n\n`,
      subject: 'Website Contact Form'
    };

  client.sendMail(composedMessage, function(err, info){
      if (err ){
        console.log(err)
        res.redirect("/");
      }else {
        console.log('Message sent: ' + info.response);
        res.redirect("contact");
      }

  });

});


/////////////////////   VIEWS  /////////////////////

app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.get("/expertise", (req, res) => {
  res.render("expertise", { title: "Expertise" });
});
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});
app.get("/pod", (req, res) => {
  res.render("pod", { title: "Print on demand" });
});
app.get("/manufacturing", (req, res) => {
  res.render("manufacturing", { title: "Manufacturing" });
});
app.get("/cosmetics", (req, res) => {
  res.render("cosmetics", { title: "Cosmetics" });
});
app.get("/fitness", (req, res) => {
  res.render("fitness", { title: "Fitness" });
});
app.get("/sitemap.xml", (req, res) => {
  res.render("sitemap", { title: "siemap" });
});

// Load video file
app.get('/video', function(req, res) {
  const path = 'public/media/fitness-bg.webm'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/webm',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})



// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app);

httpServer.listen(80, () => {
    console.log(`HTTP Server running on http://localhost:${httpPort}`);
});

httpsServer.listen(443, () => {
    console.log(`HTTPS Server running on http://localhost:${httpsPort}`);
});

// remember to delete above and uncommment below on deployment

// Listen both http & https ports
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/justcatalyst.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/justcatalyst.com/fullchain.pem'),
// }, app);
//
// httpServer.listen(80, () => {
//     console.log(`HTTP Server running on http://localhost:${httpPort}`);
// });
//
// httpsServer.listen(443, () => {
//     console.log(`HTTPS Server running on http://localhost:${httpsPort}`);
// });
