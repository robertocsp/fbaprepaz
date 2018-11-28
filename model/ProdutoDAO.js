function ProdutoDAO(){
  this._asin = ''
  this._brand = ''
  this._listPrice = 0
  this._rank = 0
  this._fee = 0

}

ProdutoDAO.prototype.setAsin = function(asin){
  this._asin = asin
}

ProdutoDAO.prototype.getAsin = function(){
  return this._asin
}

ProdutoDAO.prototype.setBrand = function(brand){
  this._brand = brand
}

ProdutoDAO.prototype.getBrand = function(){
  return this._brand
}

ProdutoDAO.prototype.setListPrice = function(listPrice){
  this._listPrice = listPrice
}

ProdutoDAO.prototype.getListPrice = function(){
  return this._listPrice
}

ProdutoDAO.prototype.setRank = function(rank){
  this._rank = rank
}

ProdutoDAO.prototype.getRank = function(){
  return this._rank
}

ProdutoDAO.prototype.setFee = function(fee){
  this._fee = fee
}

ProdutoDAO.prototype.getFee = function(){
  return this._fee
}

module.exports = ProdutoDAO
