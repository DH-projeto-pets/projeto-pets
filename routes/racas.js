const { Router } = require("express");
const RacaController = require("../controllers/RacaController");
const router = Router();

router.get("/listar/:especieId", RacaController.index);

module.exports = router;
