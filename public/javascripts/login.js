const boxError = document.querySelector('#error');
const url = document.location.href.indexOf("error=1");
if (url === 28) {
  boxError.firstElementChild.classList.remove("d-none");
}

const inputEmail = document.querySelector('[name="email"]');
const inputSenha = document.querySelector('[name="senha"]');

// console.log(inputEmail, inputSenha)



// console.log("login js");