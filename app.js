const express = require('express');
const app = express();
const conn = require("./db/conn");
const cors = require('cors');
const Curso = require("./models/Cursos") 
const User = require("./models/User")
const Content = require("./models/Content");
const Category = require ("./models/Category");
require('dotenv/config');  
const port = process.env.PORT
const nossosecret = process.env.SECRET

app.use(express.json())

app.set(secret: nossosecret);

app.use(cors({
  origin: 'https://www.meajudadireito.com.br/'
  credentials: true,
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',  
}))

/*const corsOpotions = {
  "origin": "https://www.meajudadireito.com.br/",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
}*/

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://www.meajudadireito.com.br/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER,Content-Type,X-Requested-With,Authorization,x-access-token');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Request-Headers', 'Content-Type,X-Requested-With,Authorization,x-access-token');
  res.header('Access-Control-Expose-Headers', 'x-access-token'); //essta linha habilita o token no header
  res.header('Content-Type', 'application/json');
  app.use(cors());
  next();
});


const UserRoutes = require('./routes/UserRoutes');
const CursosRoutes = require("./routes/CursosRoutes")
const ConteudosRoutes = require("./routes/ConteudosRoutes")
const CategoriaRoutes = require("./routes/CategoryRoutes")

app.use(express.static('public'))
app.use('/users', UserRoutes)
app.use('/cursos', CursosRoutes)
app.use('/materias', ConteudosRoutes)
app.use('/categorias', CategoriaRoutes)

app.get('/', (req,res) => res.json({ title: "Api em node"}));

conn
.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))
  .then(() => {
    app.listen(port, () => console.log(`Servidor subiu com sucesso`));
 })

.catch((err) =>  console.log("O erro tá aqui: " + err));
