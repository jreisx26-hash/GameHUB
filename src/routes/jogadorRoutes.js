import { Router } from "express";
import * as jogadorController from "../controllers/jogadorController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

router.get("/jogador", jogadorController.listar);

router.get("/jogador/:id", validarId, jogadorController.buscarPorId);

router.post("/jogador", jogadorController.criar);

router.put("/jogador/:id", validarId, jogadorController.atualizar);

router.delete("/jogador/:id", validarId, jogadorController.excluir);

export default router;