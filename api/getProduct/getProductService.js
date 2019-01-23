const mws = require('../mwsIntegration/mwsIntegrationService')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRECT_ACCESS_KEY,
    merchantId: process.env.SELLER_ID //Seller ID

})

const mwsProducts = require('../mwsIntegration/mwsProducts')
let produtoDAO = require('../../model/ProdutoDAO')

function getProduct(req, res){

  var upc = req.body.upc
  //var asin = req.body.asin

  var _produtoDAO = new produtoDAO()

  try{
      var asin = mwsProducts.getMatchingProductForUPC(upc, function(callback){
        _produtoDAO = callback
        /*
        console.log(`Asin do callback fora do modulo: ${_produtoDAO.getAsin()}`)
        console.log(`listPrice do callback fora do modulo: ${callback.getListPrice()}`)
        console.log(`Brand do callback fora do modulo: ${callback.getBrand()}`)
        console.log(`Rank do callback fora do modulo: ${callback.getRank()}`)
        console.log(`Categoria do callback fora do modulo: ${callback.getCategoria()}`)
        console.log(`Nome do callback fora do modulo: ${callback.getNome()}`)
        console.log(`Fee do callback fora do modulo: ${callback.getFee()}`)
        console.log(`Peso do callback fora do modulo: ${callback.getPeso()}`)
        */

        //console.log(`shipping ${_produtoDAO.getShipping()}`)
        //ajustando o Fee
        _produtoDAO.setFee((_produtoDAO.getFee() - _produtoDAO.getShipping()).toFixed(2))



        var objetoJson =
        {
            'ASIN' : _produtoDAO.getAsin(),
            'Nome': _produtoDAO.getNome(),
            'BuyBox': _produtoDAO.getListPrice(),
            'Fee': _produtoDAO.getFee(),
            'Shipping': _produtoDAO.getShipping(),
            'Rank': _produtoDAO.getRank(),
            'URL:': 'http://www.amazon.com/gp/product/'+_produtoDAO.getAsin(),
            'Preco_Cliente':0
        }

        //var json = JSON.stringify({anObject:objetoJson})

        //res.send(json)

        res.json(objetoJson)


      })
  }
  catch(error){
    console.log(error)
    res.send(error)
  }

}

module.exports = { getProduct }