function ProdutoDAO(){
  this._asin = ''
  this._upc = ''
  this._brand = ''
  this._listPrice = 0
  this._rank = 0
  this._categoria = ''
  this._fee = 0
  this._nome = ''
  this._peso = ''
  this._shipping = 0

}

ProdutoDAO.prototype.setAsin = function(asin){
  this._asin = asin
}

ProdutoDAO.prototype.getAsin = function(){
  return this._asin
}

ProdutoDAO.prototype.setUpc = function(upc){
  this._upc = upc
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

ProdutoDAO.prototype.setCategoria = function(categoria){
  this._categoria = categoria
}

ProdutoDAO.prototype.getCategoria = function(){
  return this._categoria
}

ProdutoDAO.prototype.setFee = function(fee){
  this._fee = fee
}

ProdutoDAO.prototype.getFee = function(){
  return this._fee
}

ProdutoDAO.prototype.setNome = function(nome){
  this._nome = nome
}

ProdutoDAO.prototype.getNome = function(){
  return this._nome
}

ProdutoDAO.prototype.setPeso = function(peso){
  this._peso = peso
}

ProdutoDAO.prototype.getPeso = function(){
  return this._peso
}

ProdutoDAO.prototype.setShipping = function(shipping){
  this._shipping = shipping
}

ProdutoDAO.prototype.getShipping = function(){
  return this._shipping
}

ProdutoDAO.prototype.suggestedPrice = function(){
  var lucroAntesValorProduto = this._listPrice - this._fee - this._shipping
  var suggestedPrice = lucroAntesValorProduto * 0.65 //este 0.65 ainda precisa ser melhor testado.
  var lucroAposValorProduto = this._listPrice - this._fee - this._shipping - suggestedPrice
  if (lucroAposValorProduto > 5){
    return suggestedPrice - 1.29 // o custo de redirecionamento é adicionado posterioremente no formulario
  }
  else{
    suggestedPrice = suggestedPrice - (5 - lucroAposValorProduto)
    return suggestedPrice

  }

}


module.exports = ProdutoDAO
