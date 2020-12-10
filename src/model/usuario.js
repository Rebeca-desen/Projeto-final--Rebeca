const mongoose = require('mongoose')
const contas = require('./contas')

const usuarioSchema = new mongoose.Schema ({
    id: { type: Number },
    nomeCompleto: { type: String, required: true },
    nomeSocial: { type: String },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    numero: { type: Number },
    dataDeNascimento: { type: String },
    contas: [contas.contasSchema]
},
{
    versionKey: false
})

const usuario = new mongoose.model("usuarios",usuarioSchema)

module.exports = usuario