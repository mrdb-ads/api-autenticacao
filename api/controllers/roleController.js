const RoleService = require('../services/roleService.js');

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({nome, descricao});

      return res.status(201).send(role);

    } catch (error) {
      return res.status(400).send({message: error.message});
    }
  }

  static async getRoles(req, res) {
    try {
      const roles = await roleService.getRoles();

      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }

  static async getRolesById(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.getRolesById(id);

      return res.status(200).send(role);
    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }

  static async editarRole(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      const roleEditada = await roleService.editarRole(id, dados);

      return res.status(200).send(roleEditada);

    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }

  static async deletarRole(req, res) {
    const { id } = req.params;

    try {
      const mensagem = await roleService.deletarRole(id);
			return res.status(200).json(mensagem);

    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }
}

module.exports = RoleController;