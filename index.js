require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT;
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const conn = require("./db/conn");
const rotasSabores = require("./routes/saborRotas");
const authRotas = require("./routes/authRotas");
const exphbs = require("express-handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  name: "session",
  secret: "nosso_secret",
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function () {},
    path: require("path").join(__dirname, "sessions"),
  }),
  cookie: {
    secure: false,
    httpOnly: true,
  },
}));

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/", authRotas);
app.use("/", rotasSabores);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});

conn.sync().then(() => {
  console.log("Conectado com sucesso!");
}).catch((err) => {
  console.log("Erro: " + err);
});