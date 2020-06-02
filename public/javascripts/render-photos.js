const imgArquivo = (e) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    let preview = document.querySelector(".preview-img");
    preview.src = fileReader.result;
  };
  fileReader.readAsDataURL(e.target.files[0]);
};

const mountPreview = (e, i) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const previews = document.querySelectorAll("[data-id='multiplePreview']");
    previews[i].src = fileReader.result;
  };
  fileReader.readAsDataURL(e);
};

const renderFotos = (e) => {
  for (file in e.target.files) {
    mountPreview(e.target.files[file], file);
  }
};

const pv = document.querySelector("[data-name='primeiroPreview']");
if (pv) {
  pv.addEventListener("load", (e) => {
    const preview = document.querySelector(".preview-img");
    preview.src = e.target.src;
  });
}
