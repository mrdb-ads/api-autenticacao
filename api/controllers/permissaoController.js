const PermissaoService = require('../services/permissaoService')

const permissaoService = new PermissaoService()

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body
    try {
      const permissao = await permissaoService.cadastrar({ nome, descricao});
      
      return res.status(201).send(permissao);

    } catch (error) {
      res.status(400).send({ message: error.message});
    }
  }

  static async getPermissoes(req, res) {
    const permissoes = await permissaoService.getPermissoes();    
    return res.status(200).json(permissoes);
  }  

  static async getPermissaoById(req, res) {
    try {
      const { id } = req.params;
      const permissao = await permissaoService.getPermissaoById(id);

      return res.status(200).json(permissao);

    } catch (error) {
      console.log('Message error: ', error.message)
      res.status(400).send({ message: error.message })
    }
  }

  static async deletarPermissao(req, res) {
    const { id } = req.params

    try {
      await permissaoService.deletarPermissao(id);

      return res.status(200).send({ message: 'Permissão deletada com sucesso!' });

    } catch (error) {
      console.log('Message error: ', error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async editarPermissao(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const role = await permissaoService.editarPermissao({ id, nome, descricao });  
      return res.status(200).json(role);

    } catch (error) {
      console.log('Message error: ', error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}
module.exports = PermissaoController