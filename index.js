const express = require("express");
const { engine } = require("express-handlebars"); 
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
require('dotenv').config();
const port = process.env.PORT
const app = express();
const conn = require("./db/conn");
const Entrada = require("./models/Entrada");
const Saida = require("./models/Saida");
const User = require("./models/User");
//rotas
const publicRoutes = require('./routes/PublicRoutes');
const authRoutes = require('./routes/AuthRoutes')

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
  app.use(express.json());
  app.use(
    session({
      name: 'session',
      secret: 'nosso_secret',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
      }),
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    }),
  )
  
app.use(flash());

app.use(express.static("public"));

app.use((req, res, next) => {
     
     if (req.session.userid) {
     res.locals.session = req.session;
    }
     next();
  });
 //routes 
app.use('/', publicRoutes)
app.use('/auth', authRoutes)

conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));