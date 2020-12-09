const mongoose = require('mongoose')

const contasSchema = new mongoose.Schema({
    donxDaConta: { type: String, required: true },
    conta: { type: String, required: true },
    tipoDeConta: { type: String, required: true },
    dadosDaConta: { type: Array, required: true } // no banco de dados fica salvo como array
},
{versionKey: false}
)

const contasModel = new mongoose.model('contasCollection', contasSchema)

module.exports = {
    contasModel,
    contasSchema
}