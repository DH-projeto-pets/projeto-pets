const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

let UserController = {
  showLogin: (req, res) => {
    res.render("screen/login", { logged: false });
  },

  logarUsuario: async (req, res) => {
    const { email, senha } = req.body;
    const user = await this.logarUsuario.findOne({ where: { email } });
    if (!user) {
      res.redirect("/login?error=1");
    }
    if (!bcrypt.compareSync(senha, usuario.senha)) {
      res.redirect("/login?error=1");
    }
  },
  store: (req, res) => {
    // cria o user no db
  },
  update: (req, res) => {
    // altera o usuario
  },
  delete: (req, res) => {
    // deleta o usuario
  },
  login: (req, res) => {
    // faz login aka salva o cooke
  },
  show: (req, res) => {
        // consulta se o usuario existe
  },
  getUser: (req, res) => {
    // mostra o perfil do proprio usuario usando o id que está no cookie
  },

  showUser: (req, res) => {},
  showGerenciamento: (req, res) => {},
  showUpdate: (req, res) => {}
};

module.exports = UserController;
