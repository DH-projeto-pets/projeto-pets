const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

let UserController = {
    showLogin: (req, res) => {
        res.render('screen/login', { logged: false });
    },

    logarUsuario: async (req, res) => {
        const {email, senha} = req.body;
        const user = await this.logarUsuario.findOne({where: { email } });
        if(!user){
            res.redirect('/login?error=1')
        }
        if(!bcrypt.compareSync(senha, usuario.senha)){
            res.redirect('/login?error=1');
        }


    }

}

module.exports = UserController;