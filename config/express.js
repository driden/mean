const config = require('./config')
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

module.exports = () => {
    const app = express()
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
    else if (process.env.NODE_ENV === 'production') app.use(compress())
    
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(methodOverride())

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }))

    app.set('views','./app/views')
    app.set('view engine', 'ejs')

    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/', express.static(path.resolve('./public')))
    app.use('/lib', express.static(path.resolve('./node_modules')))

    require('../app/routes/index.server.routes')(app)
    require('../app/routes/users.server.routes')(app)
    
    return app
}