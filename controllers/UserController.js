//  Importando dotenv para pegar chave da API
require('dotenv').config();

const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { sequelize, User, Pet } = require("../models");

// Importando pacote para usar com a API
const NodeGeocoder = require('node-geocoder');
// Configurações da API
const options = {
  provider: 'google',
  apiKey: process.env.API_KEY,
  formatter: null
};
// Criando constante que contem a API
const geocoder = NodeGeocoder(options);
// Função que calcula distância entre duas coordenadas
function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}
// Controller normal
let UserController = {
  store: async (req, res) => {
    const { email, senha, nome } = req.body;
    const usuarioExiste = await User.findOne({
      where: {
        email,
      },
    }).then((u) => u);

    if (usuarioExiste) res.redirect("/cadastrar?error=1");

    const usuario = await User.create({
      email,
      senha: bcrypt.hashSync(senha, 10),
      nome,
    });
    res.send(req.body);
    // cria o user no db
  },
  // Uso da API
  update: async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors, req.body);
    // if (errors.isEmpty()) {
    const id = req.session.user.id;
    if (req.file) {
      var image = `/images/dinamics/${req.file.originalname}`;
    }
    const usuario = await User.update(
      {
        ...req.body,
        image,
      },
      { where: { id } }
    );

//     // Pegando o endereço colocado no formulario de edição do usuario
//     const { logradouro, numero, bairro, cep, cidade, estado } = req.body;
//     // Contatenando endereço (parâmetro a passar para API)
//     const endereco = `${logradouro} ${numero} ${bairro} ${cep} ${cidade} ${estado}`;
//     // Usando API para obter objeto que contém as coordenadas
//     const geoLoc = await geocoder.geocode(endereco);
//     // Para ver o objeto retornado pela API
//     // console.log(geoLoc)
//     const usuario = await User.update({
//       ...req.body,
//       // Colocando coordenadas no banco de dados
//       latitude: geoLoc[0].latitude,
//       longitude: geoLoc[0].longitude,
//     },
//     { where: { id } },
//     );
 
    const { nome } = await User.findOne({
      where: {
        id,
      },
    });
    req.session.save(() => {
      req.session.user.nome = nome;
      return res.redirect("/user/editar");
    });
    // }
    // res.render("screen/edit-user", { errors });
  },
  delete: (req, res) => {
    // deleta o usuario
  },
  login: async (req, res) => {
    // console.log(req.body);
    const { email, senha } = req.body;
    const usuario = await User.findOne({
      where: {
        email,
      },
    }).then((u) => u);

    // falta validar se o usuario existe ou n
    if (!usuario) {
      res.redirect("/login?error=1");
    }
    // falta validar a senha
    if (!bcrypt.compareSync(senha, usuario.senha)) {
      res.redirect("/login?error=1");
    }
    // faz login aka salva o cooke
    req.session.user = usuario;

    return res.redirect("/");
  },
  show: async (req, res) => {
    const { id } = req.params;

    const usuario = await User.findOne({ where: { id }, include: ["pets"] });
    // console.log(user)
    if (!usuario) return res.render("404-not-found");
    res.render("screen/owner-profile", { usuario });
  },
  showGerenciamento: async (req, res) => {
    const { id } = req.session.user;

    const user = await User.findOne({
      where: { id },
      include: [
        // "pets",
        {
          model: Pet,
          as: "pets",
          include: "fotoPrincipal",
        },
      ],
    });

    res.render("screen/manager-pet", { pets: user.pets });
  },
  showUpdate: async (req, res) => {
    const usuario = await User.findOne({
      where: {
        id: req.session.user.id,
      },
    });
    // console.log(usuario)
    res.render("screen/edit-user", { usuario });
  },
};

module.exports = UserController;
