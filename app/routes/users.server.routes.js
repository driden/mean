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

    app.get('/oauth/twitter', passport.authenticate('twitter',{
        failureRedirect: '/signin'
    }))

    app.get('/oauth/twitter/callback', passport.authenticate('twitter',{
        failureRedirect: '/signin',
        successRedirect: '/'
    }))

    app.get('/oauth/google', passport.authenticate('google',{
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }))
    
    app.get('/oauth/google/callback', passport.authenticate('google',{
        failureRedirect: '/signin',
        successRedirect: '/'
    }))
}