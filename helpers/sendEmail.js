const nodemailer = require('nodemailer');

require('dotenv').config();

module.exports.sendEmail = async (req,res, next) => {

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

var message = {
  from: "matheus_pvhcem@gmail.com",
  to: "matheus_pvhcem@gmail.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>"
};

transport.sendMail(message, function (err) {
  if(err){
    return res.status(400).json({
      erro: true,
      message: "Erro: Não foi possível enviar o e-email"
    })
  }
  return res.status(200).json({
    erro: false,
    message: "E-mail enviado com sucesso"
  })
})

})

