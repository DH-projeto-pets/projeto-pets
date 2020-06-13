const cep = document.querySelector('[name="cep"]');
const errorField = cep.nextElementSibling;

const logradouro = document.querySelector('[name="logradouro"]');
const bairro = document.querySelector('[name="bairro"]');
const cidade = document.querySelector('[name="cidade"]');
const estado = document.querySelector('[name="estado"]');

if (cep) {
  cep.addEventListener("input", (e) => {
    cep.value = e.target.value.replace(/\D/g, "");
  });
  cep.addEventListener("blur", async (e) => {
    const parsedCep = e.target.value.replace(/\D/g, "");
    if (/\d{8}/.test(parsedCep)) {
      cep.classList.remove("is-invalid");
      const endereco = await fetch(`http://viacep.com.br/ws/${parsedCep}/json`)
        .then((res) => res.json())
        .catch((err) => error(err, "Digite um CEP válido"));
      if (endereco) {
        logradouro.value = endereco.logradouro;
        bairro.value = endereco.bairro;
        estado.value = endereco.uf;
        cidade.value = endereco.localidade;
      }
    } else {
      cep.classList.add("is-invalid");
      errorField.innerHTML = "O CEP precisa ter ao menos 8 dígitos";
    }
  });
}

function error(e, msg) {
  cep.classList.add("is-invalid");
  errorField.innerHTML = msg;
}
