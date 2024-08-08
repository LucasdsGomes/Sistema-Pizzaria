const Sabores = require('../models/Sabores');
const moment = require('moment');

module.exports = class SaborController {
  static async index(req, res) {
    res.redirect('/home');
  }

  static async getInformacao(req, res) {
    const userId = req.session.userId;
    const allPizza = await Sabores.findAll({ 
      where: { userId: userId },
      raw: true 
    });
    res.render("informacoes", { allPizza });
  }

  static async informacao(req, res) {
    const userId = req.session.userId;
    const id = parseInt(req.params.id);
    const saborProcuraID = await Sabores.findOne({
      where: { id: id, userId: userId },
      raw: true
    });
    if (saborProcuraID) {
      res.render("informacao", { saborProcuraID }); 
    } else {
      res.redirect("/");
    }
    
  }

  static async getCadastrar(req, res) {
    res.render("cadastrar");
  }

  static async cadastrar(req, res) {
    const userId = req.session.userId;
    const datainsercao = moment().format('DD/MM/YYYY HH:mm:ss');
    const status = true;

    const dadosPizza = {
      novoSabor: req.body.novoSabor,
      datainsercao: datainsercao,
      status: status,
      quantidadePedido: req.body.quantidadePedido,
      tamanhoPizza: req.body.tamanhoPizza,
      userId: userId
    };

    await Sabores.create(dadosPizza);
    res.redirect(`/`);
  }

  static async getFormAtualizar(req, res) {
    const userId = req.session.userId;
    const allPizza = await Sabores.findAll({
      where: { userId: userId },
      raw: true
    });
    res.render("atualizar", { allPizza });
  }

  static async atualizar(req, res) {
    const userId = req.session.userId;
    const idSabor = parseInt(req.params.id);
    const novosDados = {
      novoSabor: String(req.body.saborAtualizado),
      tamanhoPizza: req.body.novoTamanho,
      quantidadePedido: req.body.novaQtd,
    }
    await Sabores.update(novosDados, { 
      where: { id: idSabor, userId: userId }
    });
    res.redirect("/pedido/informacoes");
  }

  static async getRemocao(req, res) {
    const userId = req.session.userId;
    const allPizza = await Sabores.findAll({
      where: { userId: userId },
      raw: true
    });
    res.render("remocao", { allPizza });
  }

  static async remocao(req, res) {
    const userId = req.session.userId;
    const idSabor = parseInt(req.params.id);
    await Sabores.destroy({ 
      where: { id: idSabor, userId: userId }
    });
    res.redirect("/");
  }
}
