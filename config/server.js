const port = 3030
const portSSL = 3031

const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser')
const express = require('express')
const server = express()


//Certificado https
// Certificate


//Este middleware diz para o server, se os dados foram passados por um formulario.
server.use(bodyParser.urlencoded({ extended: true }))

//Verificar se dentro da requisicao o corpo do conteudo é um JSON
server.use(bodyParser.json())

server.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))


server.listen(port, function(){
  console.log(`backend is running on port ${port}.`)
})


const production = process.env.ENV_PRODUCTION

if (typeof production !== 'undefined'){
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/app.voiservices.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/app.voiservices.com/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/app.voiservices.com/chain.pem')
  }, server).listen(portSSL, () => {
    console.log(`Listening HTTPS on port ${portSSL}.`)
  })
} else{
  https.createServer({
    key: fs.readFileSync('/Users/robertopereira/Dropbox/VoiServices-Holding/apps/localssl/server.key'),
    cert: fs.readFileSync('/Users/robertopereira/Dropbox/VoiServices-Holding/apps/localssl/server.crt')
  }, server).listen(portSSL, () => {
    console.log(`Listening HTTPS on port ${portSSL}.`)
  })
}
module.exports = server
