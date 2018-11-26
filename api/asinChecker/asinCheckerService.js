const _ = require('lodash')

function checkAsinsInInventory(req, res){

  var user_plataforma = req.body.user_plataforma
  var nome_loja = req.body.nome_loja
  var token_loja = req.body.token_loja
  console.log(req.body.user_plataforma)
  for (i in req.body.produtos){
    console.log(`ASIN produto dentro do for: ${req.body.produtos[i].asin}`)
    console.log(`ASIN produto dentro do for: ${req.body.produtos[i].quantidade}`)
    //Pegar os valores do ASIN e primeiramente verificar se os produtos estão no inventário do cliente


  }

  res.send('funcao que irá checar os asins')

}

function getMatchingProductForId(req, res){
  const mws = require('../mwsIntegration/mwsIntegrationService')({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRECT_ACCESS_KEY,
      merchantId: process.env.SELLER_ID //Seller ID

  })


  // create object with path and query
  let listOrders = {
    path: '/Products/2011-10-01',
    query: {
      'Action': 'GetMatchingProductForId',
      'IdList.Id.1': req.params.asin,
      'ItemCondition': 'New',
      'IdType': 'ASIN',
      'MarketplaceId': 'ATVPDKIKX0DER', //id dos USA
      'Version': '2011-10-01'
    }
  }


  mws.request(listOrders, function(e, result) {
    res.send(JSON.stringify(result, undefined, 400))
  });

}

module.exports = { checkAsinsInInventory, getMatchingProductForId }
