const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

module.exports = () => {
    const app = express()
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
    else if (process.env.NODE_ENV === 'production') app.use(compress())
    
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(methodOverride())
    
    require('../app/routes/index.server.routes')(app)
    return app
}