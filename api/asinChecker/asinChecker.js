const restful = require('node-restful')
const mongoose = restful.mongoose


const produtoSchema = new mongoose.Schema({
  asin: {type: String, required: true},
  quantidade: {type: Number, required: true}
})

const asinCheckerSchema = new mongoose.Schema({
  user_plataforma: {type: String, required: true },
  nome_loja: {type: String, required: true},
  token_loja: {type: String, required: true},
  produtos: [produtoSchema]
})



module.exports = restful.model('AsinChecker', asinCheckerSchema )

/*
user_plataforma:Bandeira
nome_loja:Bandeira louca
token_loja:7676766
produtos[0][asin]:B98982HH
produtos[0][quantidade]:3
produtos[1][asin]:B982GAGA
produtos[1][quantidade]:1
*/
