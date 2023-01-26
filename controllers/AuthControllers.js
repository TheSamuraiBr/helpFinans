const User = require("../models/User");
const bcrypt = require('bcryptjs');
import validate from "../public/js/script"

module.exports = class AuthController{

    static register(req, res){
        res.render('auth/register')
   }  
   static async registerPost(req, res) {
     const {name} = req.body.name
     const {email} = req.body.email
     const {phone} = req.body.phone
     const {password} = req.body.password
         

   
    const checkIfUserExist = User.findOne({where: {email: email}})
    if(checkIfUserExist){
      req.flash('message', 'O e-mail utilizado já foi cadastrado!')
      res.render('auth/register')
      return
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      phone,
      password: hashedPassword
    }
    try {
      await User.create(user)
      req.flash('message', 'Cadastro realizado com sucesso!')
      res.render('/')
    } catch (error) {
      console.log(error)
    }   

}

    
    static async login(req, res){
        res.render('auth/login')
    } 
}