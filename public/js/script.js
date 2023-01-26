export function validate(){

const form = document.querySelector("#form")
const inpuntName = document.querySelector("#name")
const inpuntEmail = document.querySelector("#email")
const inpuntPhone = document.querySelector("#phone")
const inpuntPassword = document.querySelector("#password")
const inpuntConfirmPassword = document.querySelector("#confirmPassword")
let click = document.getElementsByClassName("btn")

form.addEventListener("submit", (event) => {
  event.preventDefault()//evita o page reload
  
  if(inpuntName.value === ""){
    const text = "Por favor, preencha o campo do nome."
    const title = "erro"
    toggleModal(title, text)
    return
  }
  if(inpuntEmail.value === "" || !checkIfEmailIsValid(inpuntEmail.value)){
    const text = "Por favor, insira um e-mail válido."
    const title = "erro"
    toggleModal(title, text)
    return
  }
  if(inpuntPhone.value === ""){
    const text = "Por favor, preencha o campo do telefone."
    const title = "erro"
    toggleModal(title, text)
    return
  }
  if(inpuntPassword.value === ""){
    const text = "Por favor, preencha o campo da senha."
    const title = "erro"
    toggleModal(title, text)
    return
  }
  if(inpuntConfirmPassword.value === ""){
    const text = "Por favor, preencha o campo de confirmação da senha ou verifique se ela é fraca."
    const title = "erro"
    toggleModal(title, text)
    return
  }
  AuthControllers.register()

})

/*Validação de email e senha*/
//função que valida e-mail
function checkIfEmailIsValid(email) {
  //regex
  const emailRegex = new RegExp(
    //usuario12@host.com.be
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,}$/
  );
  if(emailRegex.test(email)){
    return true
  } return false
}

//validação de senha
function validatePassword(password, minDigits){
if(password.length >= minDigits){
  return true
} return false
}




/*Model*/
const closeModalButton = document.querySelector(".close-modal")
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const messageModal = document.querySelector("#message_modal")
const titleModal = document.querySelector("#title_modal")

function toggleModal(title, text){
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");

    titleModal.textContent = title
    messageModal.textContent = text
  }
 const closeModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
 }
 [closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => closeModal());
 })
}



 

