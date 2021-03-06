const mws = require('../mwsIntegration/mwsIntegrationService')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRECT_ACCESS_KEY,
    merchantId: process.env.SELLER_ID //Seller ID

})

const mwsProducts = require('../mwsIntegration/mwsProducts')
let produtoDAO = require('../../model/ProdutoDAO')

function startDecision(req, res){
  var upc = req.body.upc
  var preco = req.body.preco

  var asin = mwsProducts.getMatchingProductForUPC(upc, function(callback){
    console.log(`Asin do callback fora do modulo: ${callback.getAsin()}`)
    console.log(`listPrice do callback fora do modulo: ${callback.getListPrice()}`)
    console.log(`Brand do callback fora do modulo: ${callback.getBrand()}`)
    console.log(`Rank do callback fora do modulo: ${callback.getRank()}`)
    console.log(`Categoria do callback fora do modulo: ${callback.getCategoria()}`)
  })

  res.send(`upc: ${upc} --- preco: ${preco}`)
}

module.exports = { startDecision }
