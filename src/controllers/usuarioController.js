const importUsuario = require('../model/usuario')
const usuarios = importUsuario.usuario
const SECRET = process.env.SECRET
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const create = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
    req.body.senha = senhaComHash

   let usuario = new usuarios(req.body)

   usuario.save(function(err){
    if(err){
     return res.status(500).send('Você não conseguiu se cadastrar')
    }
    const nome = req.body.nomeSocial
    if(!nome){
        const nomeComp = req.body.nomeCompleto
       return res.status(200).send(`Bem vindx ${nomeComp}`)
    }
       return res.status(200).send(`Bem vindx ${nome}`)
   })
}

const login = (req, res) => {
    usuarios.findOne({email: req.body.email}, function(err, usuario) {
        if(!usuario){
            return res.status(404).send('Email incorreto ou inexistente')
        }
        const senhaCorreta = bcrypt.compareSync(req.body.senha, usuario.senha)
            if(!senhaCorreta) {
                return res.status(403).send('Esqueceu a senha?')
            }
            const token = jwt.sign({email:req.body.email}, SECRET)
            res.status(200).send(token)
    })
}


const getAll = (req, res) => {
usuarios.find(function(err, usuarioAll){
if(err){
    res.status(500).send('Cadê os usuários?')
    }
else{
    res.status(200).send(usuarioAll)
  }
 })
}

const getById = (req, res) => {
   
  usuarios.find({ _id: req.params._id }, function(err, usuario){
        if(err){
            res.status(500).send('Erro ao encontrar o usuário correspondente')
        }
       else { return res.status(200).send(usuario)
    }
        
    })
    
}

const remove = (req, res) => {
    
usuarios.deleteMany({ _id: req.params._id },function (err) {
      if (err) {
        return res.status(500).send('Erro ao remover o usuário')
      }
      res.status(200).send('Usuário removido com sucesso')
     
    })
}

const updateUsuario = (req, res) => {
    
    usuarios.updateMany({ _id: req.params._id },{ $set: req.body },function (err) {
        if (err) {
          return res.status(500).send('Erro ao atualizar o usuário')
        }
        res.status(200).send('Atualizado com sucesso')
       
      })

}

const usuariosOnly = (req, res) => {
    usuarios.find({}, {contas: 0}, function(err, allUsuarios){
        if(err){
            res.status(500).send('Error 500')
        }
        else{
            res.status(200).send(allUsuarios)
        }
    })
} 

module.exports = {
    create,
    login,
    getAll,
    getById,
    remove,
    updateUsuario,
    usuariosOnly
   
}