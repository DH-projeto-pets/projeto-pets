let slider = document.getElementById("myRange");
let output = document.getElementById("distance-counter");
output.innerHTML = slider.value; // Exibe o value padrão do input range

// Atualiza o value atual (cada vez que o usuário move o controlador da barra)
slider.oninput = function() {
  output.innerHTML = this.value;
}