// tem tudo aqui: https://github.com/ebusinessdirect/mws-simple

const request = require('request');

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

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

//Parametros:

var AWSAccessKeyId = 'AKIAIQWSEVWJTXSAGESA'
var MWSAuthToken = 'SIJdTy2uVpKQWzZd0BU7BpRJTIKAn1C9JOx1NSSG'
var SellerId = 'A3PCDDARUFEZ1Z'
var SignatureMethod = 'HmacSHA256'
var SignatureVersion = '2'
var SubmittedFromDate = '2018-11-24T12:00:00Z'
var Timestamp = '2018-11-24T12:00:00Z'
var Version = '"2009-01-01'


// Configure the request
var options = {
    url: 'https://mws.amazonservices.com',
    method: 'POST',
    headers: headers,
    form: {
      'name':'maio/2017',
      'month':'5',
      'year':'2017',
      'credits[0][name]':'Salario Empresa',
      'credits[0][value]':'7300',
      'credits[1][name]':'Consultoria',
      'credits[1][value]':'1900',
      'debts[0][name]':'Telefone',
      'debts[0][value]':'200'
    }
}



module.exports = { checkAsinsInInventory }
//module.exports = AsinChecker
