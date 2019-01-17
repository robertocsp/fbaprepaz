function replaceColonInJSON(obj){
  var resultado = {};
  for (var property in obj) {
    if(typeof obj[property] === 'object'){
      obj[property] = replaceColonInJSON(obj[property])
    }
    resultado[property.replace(/:/g, '')] = obj[property];
  }
  return resultado;
}

function getValueOfFirstObject(obj){
  var resultado = ''
  for (var property in obj) {
    if(typeof obj[property] === 'object'){
      obj[property] = getValueOfFirstObject(obj[property])
    }
    resultado = obj[property]
    break

  }
  return resultado;
}

module.exports = { replaceColonInJSON , getValueOfFirstObject }
