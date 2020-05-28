let fotos = [];

const imgArquivo = (e) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    let preview = document.querySelector('.preview-img');
    let preview2 = document.getElementById('foto1');
    preview.src = fileReader.result;
    preview2.src = fileReader.result;
    // console.log(preview2.source);
  }
  fileReader.readAsDataURL(e.target.files[0]);
};