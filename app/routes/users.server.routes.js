const users = require('../controllers/users.server.controller')
const passport = require('passport')

module.exports = (app) => {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup)
    
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }))

    app.get('/signout', users.signout)

    app.get('/oauth/facebook', passport.authenticate('facebook',{
        failureRedirect: '/signin'
    }))

    app.get('/oauth/facebook/callback', passport.authenticate('facebook',{
        failureRedirect: '/signin',
        successRedirect: '/',
        scope: ['email',"public_profile"]
    }))
}