const especieSelect = document.querySelector("[name='especie']");
const racasSelect = document.querySelector("[name='raca']");
$("select").selectpicker();

const getRacas = async (especieId) => {
  const response = await fetch(
    `http://localhost:3000/racas/listar/${especieId}`
  );
  const racas = await response.json();
  return racas;
};

if (especieSelect) {
  especieSelect.addEventListener("change", async (e) => {
    const especie = e.target.value;
    if (Number(especie) !== NaN) {
      const racas = await getRacas(especie);
      $("select").selectpicker("destroy");
      racasSelect.innerHTML = "";
      for (raca of racas) {
        const opt = document.createElement("option");
        opt.value = raca.id;
        opt.innerText = raca.nome;
        racasSelect.append(opt);
      }
      $("select").selectpicker();
    }
  });
}
