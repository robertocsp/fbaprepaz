const _ = require('lodash')
const mws = require('../mwsIntegration/mwsIntegrationService')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRECT_ACCESS_KEY,
    merchantId: process.env.SELLER_ID //Seller ID

})

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



  // create object with path and query
  let listOrders = {
    path: '/Products/2011-10-01',
    query: {
      'Action': 'GetMatchingProductForId',
      'IdList.Id.1': req.params.asin,
      'ItemCondition': 'New',
      'IdType': 'UPC',
      'MarketplaceId': 'ATVPDKIKX0DER', //id dos USA
      'Version': '2011-10-01'
    }
  }


  mws.request(listOrders, function(e, result) {
    var upc = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].$.Id
    var asin = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].Identifiers[0].MarketplaceASIN[0].ASIN[0]
    var brand = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].AttributeSets[0]['ns2:ItemAttributes'][0]['ns2:Brand'][0]
    var listPrice = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].AttributeSets[0]['ns2:ItemAttributes'][0]['ns2:ListPrice'][0]['ns2:Amount'][0]
    var rank = parseInt(result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].SalesRankings[0].SalesRank[0].Rank[0])

    var preco = parseFloat(req.params.preco)

    var recomendacao = 'comprar'

    console.log(rank)

    var html = `upc: ${upc}<br>asin: ${asin}<br>brand: ${brand}<br>listPrice: ${listPrice}<br>rank: ${rank}<br>recomendacao: ${recomendacao}`

    //console.log(rank)
    res.send(html)
    //res.send(JSON.stringify(result, undefined, 400))
  })

}

module.exports = { checkAsinsInInventory, getMatchingProductForId }
