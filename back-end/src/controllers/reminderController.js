const connection = require('../database/connection');
// pacote do node utilizado para criptografia
// nesse caso é utilizado para gerar o id dos dados no banco
const crypto = require('crypto');

module.exports = {

  async index(request, response) {
    // equivale a: SELECT * FROM TABLE REMINDERS
    const reminders = await connection('reminders').select('*');

    return response.json(reminders);
  },

  async create(request, response) {
    // pega os dados do corpo da requisicao por meio da desestruturacao
    const { name, date } = request.body;

    // gera 4 bytes randomicos convertidos para string do tipo hexadecimal
    // const id = crypto.randomBytes(4).toString('HEX');

    // faz a conexao e insercao dos dados no background
    await connection('reminders').insert({
      // id,
      name,
      date
    })

    // retorna o id do lembrete cadastrado
    return response.status(200).json();
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      // apaga o dado
      await connection('reminders').where('id', id).delete();
    }
    catch (error) {
      console.log("Nao foi apagar o dado do banco", error);
      return response.status(400).json({ error: 'Bad Request' });
  }
    // resposta de sucesso sem conteudo dos status code
    return response.status(204).send();
  }
}
