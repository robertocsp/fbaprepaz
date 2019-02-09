const mws = require('../mwsIntegration/mwsIntegrationService')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRECT_ACCESS_KEY,
    merchantId: process.env.SELLER_ID //Seller ID

})

const jp = require('jsonpath');
const utilService = require('../util/utilService');

const produtoDAO = require('../../model/ProdutoDAO')


function GetMatchingProductForId(upc, asin, callback){
  var _produtoDAO = new produtoDAO()
  var idType = ''
  var idList = ''

  if (typeof asin !== 'undefined'){
    idType = 'ASIN'
    idList = asin
  }
  else if (typeof upc !== 'undefined') {
    idType = upc.length === 13 ? 'EAN' : 'UPC'
    idList = upc

  }


  //Tem que melhorar muito essa logica, para poder entender ASIN e outros possíveis tipos


  let postParams = {
  path: '/Products/2011-10-01',
  query: {
    'Action': 'GetMatchingProductForId',
    'IdList.Id.1': idList,
    'ItemCondition': 'New',
    'IdType': idType,
    'MarketplaceId': 'ATVPDKIKX0DER', //id dos USA
    'Version': '2011-10-01'
  }
  }



  mws.request(postParams, function(e, result) {

    try{

        //console.log(`tipo do result antes de rodar a funcao: ${JSON.stringify(result)}`)

        var resultado = utilService.replaceColonInJSON(result)

        //console.log(`tipo do result DEPOIS de rodar a funcao: ${JSON.stringify(result)}`)

        //
        //console.log(JSON.stringify(resultado))



        var asin = jp.query(resultado, '$..ASIN')
        var brand = jp.query(resultado, '$..ns2Brand')
        //var listPrice = jp.query(resultado, '$..ns2Amount')
        var rank = jp.query(resultado, '$..Rank')
        var categoria = jp.query(resultado, '$..ns2Binding')
        var nome = jp.query(resultado, '$..ns2Title')
        var peso = jp.query(resultado, '$..ns2Weight')

        //var asin = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].Identifiers[0].MarketplaceASIN[0].ASIN[0]
        //var brand = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].AttributeSets[0]['ns2:ItemAttributes'][0]['ns2:Brand'][0]
        //var listPrice = result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].AttributeSets[0]['ns2:ItemAttributes'][0]['ns2:ListPrice'][0]['ns2:Amount'][0]
        //var rank = parseInt(result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0].SalesRankings[0].SalesRank[0].Rank[0])

        _produtoDAO.setAsin(utilService.getValueOfFirstObject(asin))
        _produtoDAO.setBrand(utilService.getValueOfFirstObject(brand))
        //_produtoDAO.setListPrice(utilService.getValueOfFirstObject(listPrice))
        _produtoDAO.setRank(utilService.getValueOfFirstObject(rank))
        _produtoDAO.setCategoria(utilService.getValueOfFirstObject(categoria))
        _produtoDAO.setNome(utilService.getValueOfFirstObject(nome))
        _produtoDAO.setPeso(utilService.getValueOfFirstObject(peso))


        return callback(_produtoDAO)

    }
    catch(error){
      console.log(error)
    }

  })

}


function GetMyFeesEstimate(asin, listPrice, shipping, callback){
  var _produtoDAO = new produtoDAO()

  let postParams = {
  path: '/Products/2011-10-01',
  query: {
    'Action': 'GetMyFeesEstimate',
    'FeesEstimateRequestList.FeesEstimateRequest.1.IdType': 'ASIN',
    'FeesEstimateRequestList.FeesEstimateRequest.1.IdValue': asin,
    'FeesEstimateRequestList.FeesEstimateRequest.1.IsAmazonFulfilled': 'true',
    'FeesEstimateRequestList.FeesEstimateRequest.1.Identifier': 'request1',
    'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.ListingPrice.CurrencyCode': 'USD',
    'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.ListingPrice.Amount': listPrice,
    'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.Shipping.CurrencyCode': 'USD',
    'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.Shipping.Amount': shipping,
    'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.Points.PointsNumber': '0',
    'FeesEstimateRequestList.FeesEstimateRequest.1.MarketplaceId': 'ATVPDKIKX0DER', //id dos USA
    'Version': '2011-10-01'
  }
  }


  mws.request(postParams, function(e, result) {

    try{
        var resultado = utilService.replaceColonInJSON(result)
        //console.log(JSON.stringify(resultado))

        var fee = jp.query(resultado, '$..TotalFeesEstimate.0.Amount')
        _produtoDAO.setFee(utilService.getValueOfFirstObject(fee))


        return callback(_produtoDAO)

    }
    catch(error){
      console.log(error)
    }

  })
}

function GetLowestOfferListingsForASIN(asin, condicao, callback){


  let postParams = {
    path: '/Products/2011-10-01',
    query: {
      'Action': 'GetLowestOfferListingsForASIN',
      'ASINList.ASIN.1': asin,
      'MarketplaceId': 'ATVPDKIKX0DER', //id dos USA
      'Version': '2011-10-01'
    }
  }


  mws.request(postParams, function(e, result) {

    try{
        var resultado = utilService.replaceColonInJSON(result)
        //console.log(JSON.stringify(resultado))


        var lowestPriceFBA = 0
        var lowestPriceFBM = 0
        var vCondicao = ''
        var subCondicao = ''

        switch (condicao) {
          case 'New':
            vCondicao = 'New'
            subCondicao = 'New'
            break;
          case 'Used Like New':
            vCondicao = 'Used'
            subCondicao = 'Mint'
            break;
          case 'Used Very Good':
            vCondicao = 'Used'
            subCondicao = 'VeryGood'
            break;
          case 'Used Good':
            vCondicao = 'Used'
            subCondicao = 'Good'
            break;
          case 'Used Acceptable':
            vCondicao = 'Used'
            subCondicao = 'Acceptable'
            break;
          case 'Refurbished':
            vCondicao = 'New'
            subCondicao = 'New'
            break;
        }

        function getLowestPriceNewCondition(obj){
          var fbmPrices = []
          var fbaPrices = []
          for (var property in obj){
            if (property === 'LowestOfferListing'){
              for (var property2 in obj[property]){
                //console.log(`testar pegar o valor: ${obj[property][property2].Qualifiers[0].ItemCondition[0]}`)
                if (obj[property][property2].Qualifiers[0].ItemCondition[0] == vCondicao && obj[property][property2].Qualifiers[0].ItemSubcondition[0] == subCondicao && obj[property][property2].Qualifiers[0].FulfillmentChannel[0] == 'Merchant'){

                    fbmPrices.push(parseFloat(obj[property][property2].Price[0].LandedPrice[0].Amount[0]))
                }

                if (obj[property][property2].Qualifiers[0].ItemCondition[0] == vCondicao && obj[property][property2].Qualifiers[0].ItemSubcondition[0] == subCondicao && obj[property][property2].Qualifiers[0].FulfillmentChannel[0] == 'Amazon'){
                    fbaPrices.push(parseFloat(obj[property][property2].Price[0].LandedPrice[0].Amount[0]))
                    console.log('entrou no new fba')
                }

              }
              lowestPriceFBA = Math.min(...fbaPrices)
              lowestPriceFBM = Math.min(...fbmPrices)

            }
            if(typeof obj[property] === 'object'){
              obj[property] = getLowestPriceNewCondition(obj[property])
            }

          }
        }


        getLowestPriceNewCondition(result)

        //var listPrice = utilService.getValueOfFirstObject(jp.query(resultado, '$..LandedPrice.0.Amount'))

        //var precoMaisBaratoMerchant = utilService.getValueOfFirstObject(jp.query(resultado, '$..LandedPrice.0.Amount'))

        var listPrice

        //console.log(`lowestPriceFBA: ${lowestPriceFBA}`)
        //console.log(`lowestPriceFBM: ${lowestPriceFBM}`)

        //console.log(`Number.isFinite(lowestPriceFBA): ${Number.isFinite(lowestPriceFBA)}`)
        //console.log(`Number.isFinite(lowestPriceFBM): ${Number.isFinite(lowestPriceFBM)}`)


        listPrice = lowestPriceFBA === 0 || Number.isFinite(lowestPriceFBA) === false  ? lowestPriceFBM : lowestPriceFBA

        //console.log(`listPrice: ${listPrice}`)

        return callback(listPrice)

    }
    catch(error){
      console.log(error)
    }

  })
}


function getMatchingProductForUPCASIN(upc, asin, condicao, callback){
  var _produtoDAO = new produtoDAO()

  GetMatchingProductForId(upc, asin, function(callback2){
    _produtoDAO = callback2
    var asin = _produtoDAO.getAsin()

    GetLowestOfferListingsForASIN(asin, condicao, function(callback3){
      var listPrice = parseFloat(callback3).toFixed(2)
      _produtoDAO.setListPrice(listPrice)

      let shipping = _produtoDAO.getPeso() * 0.45 //Eu determinei este valor mas isso ideal vir de sistema
      _produtoDAO.setShipping(shipping.toFixed(2))

      GetMyFeesEstimate(asin, listPrice, shipping, function(callback4){
        let fee = parseFloat(callback4.getFee()).toFixed(2)
        _produtoDAO.setFee(fee)
        return callback(_produtoDAO)
      })
    })
  })
  //var _produtoDAO2 = GetMyFeesEstimate(_produtoDAO1.getAsin(), callback)



}

module.exports = { getMatchingProductForUPCASIN }
