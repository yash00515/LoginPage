 const express = require("express");
const session = require("express-session");
const path = require("path");

require("./config/Database");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/login");
});
const authRouter = require("./Routes/AuthRouter");  
app.use("/", authRouter);  


 app.use("/", require("./Routes/AuthRouter"));
app.use("/", require("./Routes/Dashboard"));
app.use("/", require("./Routes/ProDuctRoute"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
