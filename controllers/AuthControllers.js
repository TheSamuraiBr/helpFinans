const User = require("../models/User");
const bcrypt = require('bcryptjs');

module.exports = class AuthController{

    static register(req, res){
        res.render('auth/register')
   }  
   static async registerPost(req, res) {
     const name = req.body.name
     const email = req.body.email
     const phone = req.body.phone
     const password = req.body.password
     const confirPassword = req.body.confirmpassword

     if(!name){
      req.flash('message', 'É obrigatório preencher o campo do nome!')
      res.render('auth/register')
      return
     }
     if(!email){
      req.flash('message', 'É obrigatório preencher o campo do e-mail!')
      res.render('auth/register')
      return
     }
     /*Teste de checagem de e-mail*/ 
     function checkIfEmailIsValid(email) {
      //regex
      const emailRegex = new RegExp(
        
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,}$/
      );
      if(emailRegex.test(email)){
        return true
      } return false
    }
    if(!checkIfEmailIsValid(email)){
      req.flash('message', 'Por favor, insira um e-mail válido')
      res.render('auth/register')
      return
    }
     
     if(!phone){
      req.flash('message', 'É obrigatório preencher o campo do telefone')
      res.render('auth/register')
      return
     }
     if(!password){
      req.flash('message', 'É obrigatório preencher o campo da senha!')
      res.render('auth/register')
      return
     }
    if (password.length < 7) {
      req.flash('message', 'A senha dever ter no mínimo 7 caracteres.')
      res.render('auth/register')
      return
    }    

    const numbers = /([0 - 9])/;
    const alphabet = /([a-zA-Z])/;
	  const chSpecial = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
   
    if(!password.match(chSpecial) && !password.match(numbers) && !password.match(alphabet)){
      req.flash('message', 'A senha é fraca, ela deve conter, letras, números e caracteres especiais!')
      res.render('auth/register')
      return
    }  
    
     if(!confirPassword){
      req.flash('message', 'É obrigatório preencher o campo de confirmação da senha')
      res.render('auth/register')
      return
     }

     if(password != confirPassword){
      req.flash('message', 'As senhas são diferentes')
      res.render('auth/register')
      return
     }  
       
    const checkIfUserExist = await User.findOne({where: {email: email}});

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
      password: hashedPassword,
    }     
    
    try {
     const createdUser =  await User.create(user)
      req.session.userid = createdUser.id
      req.flash('message', 'Cadastro realizado com sucesso')      
      req.session.save(() => {
      res.redirect('/')
      })     
    } catch (err) {
      console.log(err)
    }
  
  }  
  static logout(req, res){
    req.session.destroy()
    res.redirect('/auth/login')       
  }
  

    static async login(req, res){
        res.render('auth/login')
    } 

    static async loginPost(req, res){
  
      const {email, password} = req.body

      if(!email){
      req.flash('message', 'É obrigatório preencher o campo do e-mail!')
      res.render('auth/login')
      return
      }

      if(!password){
        req.flash('message', 'É obrigatório preencher o campo da senha!')
        res.render('auth/login')
        return
       }

      const user = await User.findOne({where: {email: email}})
      
      if(!user){
        req.flash('message', 'O e-mail digitado não existe!')
        res.render('auth/login')
        return
      }

      const checkPassword = bcrypt.compareSync(password, user.password)

      if(!checkPassword){
        req.flash('message', 'A senha está incorreta!')
        res.render('auth/login')
        return
      }
    req.session.userid = user.id
    req.flash('message', 'Login realizado com sucesso')      
    req.session.save(() => {
    res.redirect('/')
      })     

  } 
}