const InventoryBuilding = require('./inventoryODM')
const mwsProducts = require('../mwsIntegration/mwsProducts')
let produtoDAO = require('../../model/ProdutoDAO')

function insertManifest(req, res){

  //Preciso descobrir se o barcode é UPC ou ASIN, para isso provavelmente preicsarei trabalhar com alguma expressão regular
  var barcode = req.body.barcode
  var asin = undefined
  var upc = undefined

  if (barcode.length === 10){
    asin = barcode
  } else{
    upc = barcode
  }

  var inventarioNumero = req.body.inventarioNumero
  var inventarioTerminal = req.body.inventarioTerminal

  var _produtoDAO = new produtoDAO()
  var condicao = 'New'

  var objetoJson = {}

  try{
    var asin = mwsProducts.getMatchingProductForUPCASIN(upc, asin, condicao, function(callback){
      _produtoDAO = callback

      if(_produtoDAO.getAsin() === ''){
        objetoJson =
        {
            'upc': '0001',
            'asin': '0001', //este é o codigo para produto não manifestado
            'name': 'product unmanifest',
            'category': 'product without category',
            'qty': 1,
            'price': 0,
            'condition': 'New',
            'datahora': Date.now(),
            'status': 'u',
            'inventarionumero': parseInt(inventarioNumero),
            'inventarioterminal': parseInt(inventarioTerminal)
        }
      } else{
        objetoJson =
        {
            'upc': barcode,
            'asin': _produtoDAO.getAsin(),
            'name': _produtoDAO.getNome(),
            'category': _produtoDAO.getCategoria(),
            'qty': 1,
            'price': _produtoDAO.getListPrice(),
            'condition': 'New',
            'datahora': Date.now(),
            'status': 'm',
            'inventarionumero': parseInt(inventarioNumero),
            'inventarioterminal': parseInt(inventarioTerminal)
        }
      }

      //Tenho que verificar se o produto já existe para incrementar a quantidade, e se não existir, gravar como unmanifested
      //InventoryBuilding.create(objetoJson)

      var query = {'asin': objetoJson.asin, 'inventarionumero': objetoJson.inventarionumero }
      InventoryBuilding.findOneAndUpdate(query, { $inc: { qty: 1 } }, { new: true }, function(err, doc){
        if (err){
          console.log(`deu erro no update: ${err}`)
        }
        if(doc === null){
          InventoryBuilding.create(objetoJson)
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.json(objetoJson)
      })

    })
  }

  catch(error){
    console.log(error)
    res.send(error)
  }

}


function manifestList(req,res){
  res.send('this will be the page with all manifests')
}


function manifestGenerate(req, res){
  //res.send(`chegou no manifestGenerate via GET, id do manifesto: ${req.params.id}`)
  InventoryBuilding.find({ inventarionumero: req.params.id}).then(function (inventory, err){
    if (err){
      res.send(`deu erro: ${err}` )
    }
    else{
      inventoryToCsv(inventory, function(callback){
          //res.download(callback)
          //res.json(inventory)
          res.send(`Inventário: ${req.params.id} - total de registros: ${callback}`)
      })


    }
  })

}

function inventoryToCsv(inventoryJSON, callback){
  var fs = require('fs')
  var logger = fs.createWriteStream('./inventoryfiles/teste.csv', {
    flags: 'w' // 'a' means appending (old data will be preserved)
  })

  var cont = 0

  logger.write('category;item-description;qty;retail-per-unit;condition;packaging;upc\n')

  for( var i in inventoryJSON){
    var nameSemVirgula = inventoryJSON[i].name.replace(/,/g, '')

    logger.write(
        inventoryJSON[i].category + ';' +
        nameSemVirgula + ';' +
        inventoryJSON[i].qty + ';' +
        inventoryJSON[i].price + ';' +
        inventoryJSON[i].condition + ';' +
        'packaging;' +
        inventoryJSON[i].upc + '\n'
    )
    cont++
  }
  logger.end()
  return callback(cont)
}

function deleteProduct(req, res){
  console.log('entrou na funcao delete')
  var query = {'asin': req.params.asin, 'inventarionumero': req.params.inventario }
  var objetoJson = {}
  InventoryBuilding.findOneAndUpdate(query, { $inc: { qty: -1 } }, { new: true }, function(err, doc){
    if (err){
      console.log(`deu erro no update: ${err}`)
    }

    if (doc===null){
      objetoJson = {
        'mensagem': 'item não identificado',
        'status': 'err'
      }
    }
    else if (doc.qty <= 0) {
      InventoryBuilding.findOneAndRemove(query, function(err, doc){
        if (err){
          console.log(`deu erro no delete: ${err}`)
        }
        if (doc===null){
          objetoJson = {
              'mensagem': 'Produto excluido, quantidade igual ou menor que zero',
              'status': 'ok'
            }
        }else {
          objetoJson = {
              'mensagem': 'erro! objeto não deletado',
              'status': 'err'
            }
        }
      })
    }
    else{
      objetoJson = {
        'mensagem': `produto ainda tem quantidade: ${doc.qty}`,
        'status': 'ok'
      }
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.json(objetoJson)

  })



}

module.exports = {insertManifest, manifestGenerate, manifestList, deleteProduct}
