const imgArquivo = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let preview = document.querySelector('.preview-img');
      let preview2 = document.querySelector('.preview-img');
      preview.src = fileReader.result;
    }
    fileReader.readAsDataURL(e.target.files[0]);
  };