module.exports = {
  showGrid: (req, res) => res.render('screen/lost-found-pets'),
  showGridAdocao: (req, res) => res.render('screen/adoption-pets'),
  showPetPerfil: (req, res) => res.render('screen/lost-found-pets-profile'),
  showPetCadastro: (req, res) => res.render('screen/register-lost-found-pets'),
  showPetCadastroAdocao: (req, res) => res.render('screen/register-adopted-pets'),
  showPetEdicao: (req, res) => res.render('screen/edit-lost-found-pets'),
  showPetEdicaoAdocao: (req, res) => res.render('screen/edit-adopted-pets'),


  // controla o banco
  store: (req, res) => {},
  update: (req, res) => {},
  delete: (req, res) => {},
  index: (req, res) => {},
  show: (req, res) => {},
};

