import jogadorModel from "../models/jogadorModel.js"; 
import {textoValido} from "../utils/validacoes.js";

export function listar (req, res, next) {
    jogadorModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
};

export function buscarPorId (req, res, next) {
    jogadorModel.buscarPorId([req.id], (erro, resultado) =>{
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
};

export function criar (req, res, next) {
    jogadorModel.criar(req.body, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ message: "Jogador criado com sucesso", jogador: resultado });
    });
};

export function atualizar (req, res, next) {
    jogadorModel.atualizar(req.id, req.body, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json({ message: "Jogador atualizado com sucesso" });
    });
};

export function excluir (req, res, next) {
    jogadorModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json({ message: "Jogador excluído com sucesso" });
    });
};
