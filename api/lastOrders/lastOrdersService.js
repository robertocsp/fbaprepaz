function getLastOrders(req, res){

    const mws = require('../mwsIntegration/mwsIntegrationService')({
        accessKeyId: 'AKIAIQWSEVWJTXSAGESA',
        secretAccessKey: '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',
        merchantId: 'A3PCDDARUFEZ1Z'

    })

    let date = new Date();
    date.setDate(date.getDate() - 2);
    console.log(date.toISOString())
    // create object with path and query
    let listOrders = {
      path: '/Orders/2013-09-01',
      query: {
        Action: 'ListOrders',
        CreatedAfter: date.toISOString(),
        'MarketplaceId.Id.1': 'ATVPDKIKX0DER',
        'OrderStatus.Status.1': 'Unshipped',
        'OrderStatus.Status.2': 'PartiallyShipped',
        Version: '2013-09-01'
      }
    }

    mws.request(listOrders, function(e, result) {
      console.log(JSON.stringify(result));
    });


  res.send('chegou no getLastOrders')
}

module.exports =  { getLastOrders }
