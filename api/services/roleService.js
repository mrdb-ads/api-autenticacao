const database = require('../models');
const uuid = require('uuid');

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome
      }
    });

    if (role) {
      throw new Error('Role já cadastrada');
    }

    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      })

      return newRole;

    } catch (error) {
      throw new Error('Erro ao cadastrar role');
    }
  }

  async getRoles() {
    try {
      const roles = await database.roles.findAll();

      return roles;

    } catch (error) {
      throw new Error('Erro ao buscar funções');
    }
  }

  async getRolesById(id) {
    try {
      const role = await database.roles.findOne({
        where: {id: id}
      });

      if (role)
        return role;
      else
        return {};

    } catch (error) {
      throw new Error('Erro ao buscar função');
    }
  }

  async editarRole(id, dados) {
    try {
			const roleFoiEditada = await database.roles.update(
				dados,
				{where: {id: id}}
			);

			if (roleFoiEditada[0]) {
				const roleEditada = await this.getRolesById(id);
				return roleEditada;
			} else {
				return {"message": "Função não encontrada"};
			}

		} catch (error) {
			throw new Error('Erro ao atualizar função');
		}
  }

  async deletarRole(id) {
    try {
			const role = await this.getRolesById(id);
			console.log(role);
			if(!Object.keys(role).length)
				return {"message": "Função não encontrada"};

			await database.roles.destroy({
				where: {id: id}
			});

			return {"message": "Função deletada"};

		} catch (error) {
			throw new Error('Erro ao deletar função');
		}
  }
}

module.exports = RoleService;