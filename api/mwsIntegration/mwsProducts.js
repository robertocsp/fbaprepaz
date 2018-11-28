const mws = require('../mwsIntegration/mwsIntegrationService')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRECT_ACCESS_KEY,
    merchantId: process.env.SELLER_ID //Seller ID

})

const produtoDAO = require('../../model/ProdutoDAO')

function getMatchingProductForUPC(upc, callback){

    let postParams = {
    path: '/Products/2011-10-01',
    query: {
      'Action': 'GetMatchingProductForId',
      'IdList.Id.1': upc,
      'ItemCondition': 'New',
      'IdType': 'UPC',
      'MarketplaceId': 'ATVPDKIKX0DER', //id dos USA
      'Version': '2011-10-01'
    }
  }

  mws.request(postParams, function(e, result) {

    try{
        var asin = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].Identifiers[0].MarketplaceASIN[0].ASIN[0]
        var brand = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].AttributeSets[0]['ns2:ItemAttributes'][0]['ns2:Brand'][0]
        var listPrice = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].AttributeSets[0]['ns2:ItemAttributes'][0]['ns2:ListPrice'][0]['ns2:Amount'][0]
        var rank = parseInt(result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].SalesRankings[0].SalesRank[0].Rank[0])
        var _produtoDAO = new produtoDAO()
        _produtoDAO.setAsin(asin)
        _produtoDAO.setBrand(brand)
        _produtoDAO.setListPrice(listPrice)
        _produtoDAO.setRank(rank)
        //console.log(_produtoDAO.getListPrice())
        //return _produtoDAO
        console.log(`asin dentro da funcao do modulo: ${asin}`)
        return callback(_produtoDAO)
    }
    catch(error){
      console.log(error)
    }

  })
}

module.exports = { getMatchingProductForUPC }
