const express = require('express')

module.exports = function(server){

  //API Routes
  const router = express.Router()
  server.use('/api', router)


  server.get('/', function(req, res){
    res.send(`Voi Services APP`)
  })

  const getProduct = require('../api/getProduct/getProductService')
  router.route('/getproduct').get(getProduct.getProduct)

  const buyerDecision = require('../api/buyerDecision/buyerDecisionService')
  router.route('/buyerdecision').get(buyerDecision.startDecision)

  const weCreateYourAzShipment = require('../api/weCreateYourAzShipment/weCreateYourAzShipmentService')
  router.route('/wecreateyourazshipment').get(weCreateYourAzShipment.startShipment)

  const asinCheckerService = require('../api/asinChecker/asinCheckerService')
  router.route('/asinChecker').post(asinCheckerService.checkAsinsInInventory)
  router.route('/getproductinfo/:asin').get(asinCheckerService.getMatchingProductForId)
  //asinCheckerService.register(router, '/asinChecker')

  const testePost = require('../api/testePost/testePostService')
  router.route('/testePost').post(testePost.makePost)

  

  const lastOrders = require('../api/lastOrders/lastOrdersService')
  router.route('/lastorders').get(lastOrders.getLastOrders)


}
