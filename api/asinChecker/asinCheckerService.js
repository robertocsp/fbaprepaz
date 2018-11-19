//const AsinChecker = require('./asinChecker')

//AsinChecker.methods(['get', 'post', 'put', 'delete'])

function checkAsinsInInventory(req, res){
  console.log(req.body)

  var user_plataforma = req.body.user_plataforma
  var nome_loja = req.body.nome_loja
  var token_loja = req.body.token_loja

  for (i in req.body.produtos){
    console.log(`ASIN produto dentro do for: ${req.body.produtos[i].asin}`)
    console.log(`ASIN produto dentro do for: ${req.body.produtos[i].quantidade}`)
    //Pegar os valores do ASIN e primeiramente verificar se os produtos estão no inventário do cliente
  }



  res.send('funcao que irá checar os asins')

}

module.exports = { checkAsinsInInventory }
//module.exports = AsinChecker
