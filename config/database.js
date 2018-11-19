const mongoose = require('mongoose')

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/db_fbaprepaz'



module.exports = mongoose.connect(url, { useNewUrlParser: true })
