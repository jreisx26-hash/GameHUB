import jogoModel from "../models/jogoModel.js";
import { textoValido, inteiroPositivo } from "../utils/validacoes.js";

export function listar(req, res, next) {
    jogoModel.listar((erro, resultado) => {
        if (erro) return next(erro);

        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    const id = Number(req.params.id);

    if (!inteiroPositivo(id)) {
        return res.status(400).json({ erro: "ID inválido" });
    }

    jogoModel.buscarPorId([id], (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }

        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, ano_lancamento, preco } = req.body;

    if (!textoValido(nome)) {
        return res.status(400).json({ erro: "Nome inválido" });
    }

    if (!inteiroPositivo(ano_lancamento)) {
        return res.status(400).json({ erro: "Ano de lançamento inválido" });
    }

    if (!inteiroPositivo(preco)) {
        return res.status(400).json({ erro: "Preço inválido" });
    }

    jogoModel.criar({ nome, ano_lancamento, preco }, (erro, resultado) => {
        if (erro) return next(erro);

        return res.status(201).json(resultado);
    });
}

export function atualizar(req, res, next) {
    const id = Number(req.params.id);
    const { nome, ano_lancamento, preco } = req.body;

    if (!inteiroPositivo(id)) {
        return res.status(400).json({ erro: "ID inválido" });
    }

    if (!textoValido(nome)) {
        return res.status(400).json({ erro: "Nome inválido" });
    }

    if (!inteiroPositivo(ano_lancamento)) {
        return res.status(400).json({ erro: "Ano de lançamento inválido" });
    }

    if (!inteiroPositivo(preco)) {
        return res.status(400).json({ erro: "Preço inválido" });
    }

    jogoModel.atualizar(
        { nome, ano_lancamento, preco },
        [id],
        (erro, resultado) => {
            if (erro) return next(erro);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: "Jogo não encontrado" });
            }

            return res.status(200).json({
                mensagem: "Jogo atualizado com sucesso"
            });
        }
    );
}

export function excluir(req, res, next) {
    const id = Number(req.params.id);

    if (!inteiroPositivo(id)) {
        return res.status(400).json({ erro: "ID inválido" });
    }

    jogoModel.excluir([id], (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }

        return res.status(200).json({
            mensagem: "Jogo excluído com sucesso"
        });
    });
}