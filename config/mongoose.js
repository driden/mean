const config = require('./config')
const mongoose = require('mongoose')

mongoose.Promise = Promise
module.exports = () => {
    const db = mongoose.connect(config.db)
    require('../app/models/user.server.model')

    return db
}