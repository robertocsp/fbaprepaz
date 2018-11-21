const port = 3030
//const https = require('https')
//const devId = process.env.DEV_ID
//const azMktPlace = process.env.AZ_MKT_PLACE

const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser')
const express = require('express')
const server = express()

const production = true;

//Certificado https
// Certificate
if (production){
  const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/app.voiservices.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/app.voiservices.com/privkey.pem')
  }
}



//Este middleware diz para o server, se os dados foram passados por um formulario.
server.use(bodyParser.urlencoded({ extended: true }))

//Verificar se dentro da requisicao o corpo do conteudo é um JSON
server.use(bodyParser.json())




server.listen(port, function(){
  console.log(`backend is running on port ${port}.`)
})
if (production){
  https.createServer(options, server).listen(8443);
}
module.exports = server
