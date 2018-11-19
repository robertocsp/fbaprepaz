const mongoose = require('mongoose')

console.log(`variavel de ambiente MONGOLAB_URI: ${process.env.MONGOLAB_URI}`)

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/db_fbaprepaz'



module.exports = mongoose.connect(url, { useNewUrlParser: true })
