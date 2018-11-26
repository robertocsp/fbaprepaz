const request = require('request');

function makePost(req, res){


    // Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: 'http://localhost:3003/api/billingCycles',
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


      // Start the request
      request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              // Print out the response body
              console.log(body)
          }
      })
      res.send('chamou o post certinho')
}

module.exports = { makePost }
