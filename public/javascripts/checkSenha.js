const inputSenha = document.querySelector("[name='senha']");
const url = document.location.href.indexOf("error=1")
console.log(inputSenha)

if (url) {
    inputSenha.classList.add('is-invalid')
}
console.log(inputSenha)
