const inputSenha = document.querySelector("[name='senha']");
const inputSenhaConfirmar = document.querySelector("[name='confirmar_senha']");
const inputEmail = document.querySelector("[name='email']");
const buttonCadastrar = document.getElementById("btn-cadastrar");
const url = document.location.href.includes("error=1")

inputSenhaConfirmar.addEventListener("input", (e) => {
  const textoSenha = inputSenha.value;
  const textoConfirmarSenha = e.target.value;
  if (textoSenha === textoConfirmarSenha) {
    console.log(textoSenha, textoConfirmarSenha)
    buttonCadastrar.removeAttribute('disabled')
  } else {
    buttonCadastrar.setAttribute("disabled", "disabled");
  }
});

if (url) {
  inputEmail.classList.add('is-invalid')
}
function voltar() {
  window.history.back();
}