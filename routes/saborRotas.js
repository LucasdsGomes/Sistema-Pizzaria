const express = require("express");
const router = express.Router();
const SaborController = require("../controllers/saborController");
const AuthController = require("../controllers/authController");

router.use(AuthController.makeAuthMiddleware);
router.get("/", SaborController.index);
router.get("/pedido/cadastrar", SaborController.getCadastrar);
router.post("/pedido/cadastrar", SaborController.cadastrar);
router.get("/pedido/atualizar", SaborController.getFormAtualizar);
router.post("/pedido/atualizar/:id", SaborController.atualizar);
router.get("/pedido/remocao", SaborController.getRemocao);
router.post("/pedido/remocao/:id", SaborController.remocao);
router.get("/pedido/informacoes", SaborController.getInformacao);
router.get("/pedido/informacao/:id", SaborController.informacao);

module.exports = router;
