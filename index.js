const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.static(path.join(__dirname, "public")));


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
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});



app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
