const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
	async cadastrar(dto) {
		const usuario = await database.usuarios.findOne({
			where: {
				email: dto.email
			}
		});

		if (usuario) {
			throw new Error('Usuário já cadastrado');
		}

		const senhaHash = await hash(dto.senha, 8);

		try {
			const novoUsuario = await database.usuarios.create({
				id: uuid.v4(),
				nome: dto.nome,
				email: dto.email,
				senha: senhaHash
			});
	
			return novoUsuario;
			
		} catch (error) {
			throw new Error('Erro ao cadastrar usuário');
		}

	}

	async getUsuarios() {
		try {
			const usuarios = await database.usuarios.findAll();
			return usuarios === null ? {} : usuarios;
			
		} catch (error) {
			throw new Error('Erro ao buscar usuários');
		}

	}

	async getUsuarioById(id) {
		try {
			const usuario = await database.usuarios.findOne({
				where: {id: id}
			});

			return usuario === null ? {} : usuario;
			
		} catch (error) {
			console.log(error.message);
			throw new Error('Erro ao buscar usuário');
		}

	}

	async editar(id, dados) {
		try {
			const usuarioFoiEditado = await database.usuarios.update(
				dados,
				{where: {id: id}}
			);

			if (usuarioFoiEditado[0]) {
				const usuarioEditado = await this.getUsuarioById(id);
				return usuarioEditado;
			} else {
				return {"message": "Usuário não encontrado"};
			}

		} catch (error) {
			throw new Error('Erro ao atualizar usuário');
		}
	}

	async deletar(id) {
		try {
			const usuario = await this.getUsuarioById(id);
			console.log(usuario);
			if(!Object.keys(usuario).length)
				return {"message": "Usuário não encontrado"};

			await database.usuarios.destroy({
				where: {id: id}
			});

			return {"message": "Usuário deletado"};

		} catch (error) {
			throw new Error('Erro ao deletar usuário');
		}
	}
}

module.exports = UsuarioService;