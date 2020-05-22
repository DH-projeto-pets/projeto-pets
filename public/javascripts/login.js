const boxError = document.querySelector('#error');
const url = document.location.href.indexOf("error=1");
if (url === 28) {
  boxError.firstElementChild.classList.remove("d-none");
}
console.log("login js");