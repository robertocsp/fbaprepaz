const express = require('express')

module.exports = function(server){

  //API Routes
  const router = express.Router()
  server.use('/api', router)


  server.get('/', function(req, res){
    res.send(`Voi Services APP`)
  })

  const asinCheckerService = require('../api/asinChecker/asinCheckerService')
  router.route('/asinChecker').post(asinCheckerService.checkAsinsInInventory)
  //asinCheckerService.register(router, '/asinChecker')

  const testePost = require('../api/testePost/testePostService')
  router.route('/testePost').post(testePost.makePost)

  const lastOrders = require('../api/lastOrders/lastOrdersService')
  router.route('/lastorders').get(lastOrders.getLastOrders)

}
