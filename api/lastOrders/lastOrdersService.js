function getLastOrders(req, res){

    const mws = require('../mwsIntegration/mwsIntegrationService')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRECT_ACCESS_KEY,
        merchantId: process.env.SELLER_ID //Seller ID

    })

    let date = new Date();
    date.setDate(date.getDate() - 2);

    // create object with path and query
    let listOrders = {
      path: '/Orders/2013-09-01',
      query: {
        Action: 'ListOrders',
        CreatedAfter: date.toISOString(),
        'MarketplaceId.Id.1': 'ATVPDKIKX0DER', //id dos USA
        'OrderStatus.Status.1': 'Unshipped',
        'OrderStatus.Status.2': 'PartiallyShipped',
        Version: '2013-09-01'
      }
    }


    mws.request(listOrders, function(e, result) {
      res.send(result)
      //console.log(JSON.stringify(result));
    });


  //res.send('chegou no getLastOrders')
}

module.exports =  { getLastOrders }
