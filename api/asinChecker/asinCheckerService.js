//const AsinChecker = require('./asinChecker')

//AsinChecker.methods(['get', 'post', 'put', 'delete'])

const mwsEndPoint = 'https://mws.amazonservices.com'
const mktPlaceId = 'ATVPDKIKX0DER'


/*Amazon fornece no header a resposta do total de cotas do operador, quantas cotas restantes e data e hora que as cotas irão resetar ex:
x-mws-quota-max: 3600
x-mws-quota-remaining: 10
x-mws-quota-resetsOn: Wed, 06 Mar 2013 19:07:58 GMT
*/

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

module.exports = { checkAsinsInInventory }
//module.exports = AsinChecker
