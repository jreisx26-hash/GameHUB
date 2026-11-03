import { Router } from "express";
import * as jogoController from "../controllers/jogoController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

router.get("/jogos", jogoController.listar);

router.get("/jogos/:id", validarId, jogoController.buscarPorId);

router.post("/jogos", jogoController.criar);

router.put("/jogos/:id", validarId, jogoController.atualizar);

router.delete("/jogos/:id", validarId, jogoController.excluir);

export default router;