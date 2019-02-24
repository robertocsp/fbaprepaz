const restful = require('node-restful')
const mongoose = restful.mongoose

const inventoryBuildingSchema = new mongoose.Schema({
  upc: {type: String, required: true},
  asin: {type: String, required: true},
  name: {type: String, required: true},
  category: {type: String, required: false},
  qty: {type: Number, required: true},
  price: {type: Number, required: true},
  condition: {type: String, required: true},
  datahora: {type: Date, required: true},
  status: {type: String, required: true},
  inventarionumero: {type: Number, required: true},
  inventarioterminal: {type: Number, required: true}

})

module.exports = restful.model('InventoryBuilding', inventoryBuildingSchema)
