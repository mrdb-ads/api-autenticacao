const UsuarioService = require('../services/usuarioService.js');

const usuarioService = new UsuarioService();

class UsuarioController {
	static async cadastrar(req, res) {
		const { nome, email, senha } = req.body;

		try {
			const usuario = await usuarioService.cadastrar({nome, email, senha});
			return res.status(201).send(usuario);
			
		} catch (error) {
			return res.status(500).send({message: error.message});
		}

	}

	static async getUsuarios(req, res) {
		try {
			const usuarios = await usuarioService.getUsuarios();
			return res.status(200).json(usuarios);

		} catch (error) {
			return res.status(500).send({message: error.message});
		}
	}

	static async getUsuarioById(req, res) {
		const { id } = req.params;

		try {
			const usuario = await usuarioService.getUsuarioById(id);
			return res.status(200).json(usuario);

		} catch (error) {
			return res.status(500).send({message: error.message});
		}
	}

	static async editar(req, res) {
		const { id } = req.params;
		const dados = req.body;

		try {
			const usuarioEditado = await usuarioService.editar(id, dados);
			return res.status(200).json(usuarioEditado);

		} catch (error) {
			return res.status(500).send({message: error.message});
		}
	}

	static async deletar(req, res) {
		const { id } = req.params;

		try {
			const mensagem = await usuarioService.deletar(id);
			return res.status(200).json(mensagem);
		} catch (error) {
			return res.status(500).send({message: error.message});
		}
	}

}

module.exports = UsuarioController;