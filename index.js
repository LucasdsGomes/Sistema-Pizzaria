const express = require("express");
const moment = require('moment');

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.static("public"))

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

var novosSabores = [];
var proximoId = 0;


app.get("/pedido", (req, res) => {
  res.render(`home`);
});

app.get("/", (req, res) => {
  res.redirect("/pedido");
});

app.get("/pedido/atualizar", (req, res) => {
  res.render(`atualizar`, { novosSabores: novosSabores } );
});

app.post("/pedido/atualizar/:id", (req, res) => {
  const idSabor = parseInt(req.params.id);
  const index = novosSabores.findIndex(sabor => sabor.id === idSabor);
  const novoNomeSabor = req.body.saborInserido;
  const novoQtPedido = req.body.quantidadePedido;
  const novoTamPedido = req.body.tamanhoPizza;

  novosSabores[index].saborInserido = novoNomeSabor;
  novosSabores[index].quantidadePedido = novoQtPedido;
  novosSabores[index].tamanhoPizza = novoTamPedido;
  console.log("Sabor atualizado com sucesso...");
  res.redirect("/");
});

app.get("/pedido/remocao", (req, res) => {
  res.render(`remocao`, { novosSabores: novosSabores });
});

// ROTA DELETE, SEM DELETE :/
app.post("/pedido/remocao/:id", (req, res) => {
  const idSabor = parseInt(req.params.id);
  const index = novosSabores.findIndex(sabor => sabor.id === idSabor);
  novosSabores.splice(index, 1);
  console.log("Sabor removido com sucesso...")
  res.redirect("/");
});


app.get("/pedido/informacoes", (req, res) => {
  res.render(`informacoes`, { novosSabores: novosSabores });
});

app.get("/pedido/informacao", (req, res) => {
  res.render(`informacao`, { novosSabores: novosSabores });
});

app.get("/pedido/informacao/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = novosSabores.findIndex((sabor) => sabor.id === id);
  if (index !== -1) {
    const valorSabor = novosSabores[index].saborInserido;
    const valorQtPedido = novosSabores[index].quantidadePedido;
    const valorTamPedido = novosSabores[index].tamanhoPizza;
    const valorDataInsercao = novosSabores[index].datainsercao;
    const valorStatus = novosSabores[index].status;

    res.render("informacao", {
      saborCriado: index,
      valorDataInsercao: valorDataInsercao,
      valorStatus: valorStatus,
      valorTamPedido: valorTamPedido,
      valorQtPedido: valorQtPedido,
      valorSabor: valorSabor,
    });
  }
});

app.get("/pedido/cadastrar", (req, res) => {
  res.render(`cadastrar`, { novosSabores: novosSabores },);
});

app.post("/pedido/cadastrar", (req, res) => {
  const saborInserido = req.body.novoSabor;
  const datainsercao = moment().format('DD/MM/YYYY HH:mm:ss');
  const quantidadePedido = req.body.quantidadePedido;
  const tamanhoPizza = req.body.tamanhoPizza;

  var status = true;

  novosSabores.push({
    id: proximoId++,
    saborInserido: saborInserido,
    datainsercao: datainsercao,
    status: status,
    quantidadePedido: quantidadePedido,
    tamanhoPizza: tamanhoPizza, 
  });

  console.log(novosSabores)

  console.log("Sabor cadastrado com sucesso...")
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});