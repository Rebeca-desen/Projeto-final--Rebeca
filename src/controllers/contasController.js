const contas = require('../model/contas')

const create = (req, res) => {
    let conta = new contas(req.body)

    conta.save(function(err){ 
        if(err){
            return res.status(500).send('Erro ao incluir nova conta')
        }
        return res.status(200).send('Nova conta inclusa com sucesso')
    })
}

const getAll = (req, res) => {
  contas.find(function(err, conta){
      if(err){
          return res.status(500).send('Algo deu errado')
      }
      return res.status(200).send(conta)
  })
}

module.exports = {
    create,
    getAll
}