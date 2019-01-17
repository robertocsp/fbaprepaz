const mws = require('../mwsIntegration/mwsIntegrationService')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRECT_ACCESS_KEY,
    merchantId: process.env.SELLER_ID //Seller ID

})

const mwsProducts = require('../mwsIntegration/mwsProducts')

function startShipment(req, res){
  //Pegar todos os asins que devem ser inseridos no inventário AZ

  //Inserir os ASINs no inventário (se asin já existe não fazer nada)

  //Converter todos os ASINs para FBA e Startar o shipping.

  

  res.send('startShipment')
}

module.exports = {startShipment}
