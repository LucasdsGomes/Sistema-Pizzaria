const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email: email } });
    if (!usuario) {
      req.flash("msg", "Usuário não encontrado!");
      AuthController.login(req, res);
      return;
    }
    const senhaCorreta = bcrypt.compareSync(password, usuario.password);
    if (!senhaCorreta) {
      req.flash("msg", "Senha inválida!");
      AuthController.login(req, res);
      return;
    }
    req.flash("msg", "Autenticado com sucesso!");
    req.session.userId = usuario.id;
    req.session.nome = usuario.nome;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static signup(req, res) {
    res.render("auth/signup");
  }

  static async signupPost(req, res) {
    const { email, nome, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      req.flash("msg", "As senhas não podem ser diferentes!");
      AuthController.signup(req, res);
      return;
    }

    const usuario = await Usuario.findOne({ where: { email: email } });
    if (usuario) {
      req.flash("msg", "Já existe um usuário com este Email!");
      AuthController.signup(req, res);
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const dadosUsuario = {
      email,
      nome,
      password: hashedPassword,
    };

    const user = await Usuario.create(dadosUsuario);

    req.flash("msg", "Cadastro realizado com sucesso!");
    req.session.userId = user.id;
    req.session.nome = user.nome;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static makeAuthMiddleware(req, res, next) {
    if (!req.session.userId) {
      req.flash("msg", "Você precisa estar autenticado para acessar esta página!");
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }
    next();
  }
}
