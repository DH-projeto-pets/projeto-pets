const imgArquivo = (e) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    let preview = document.querySelector(".preview-img");
    preview.src = fileReader.result;
  };
  fileReader.readAsDataURL(e.target.files[0]);
};

const sortableImgs = new Sortable.default(
  document.querySelectorAll(".imgs-preview"),
  {
    draggable: "img",
  }
);

sortableImgs.on("drag:stop", (e) => {
  const list = document.querySelector(".imgs-preview").children;
  const preview = document.querySelector(".preview-img");
  preview.src = list[0].src;
});

const renderFotos = async (e) => {
  for (file in e.target.files) {
    if (typeof e.target.files[file] == "object") {
      await mountPreview(e.target.files[file], file);
    }
  }
};

const mountPreview = (e, i) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const previews = document.querySelectorAll("[data-id='multiplePreview']");
    previews[i].src = fileReader.result;
  };
  fileReader.readAsDataURL(e);
};
