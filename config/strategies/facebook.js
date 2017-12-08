const passport = require('passport')
const url = require('url')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('./../config')
const users = require('./../../app/controllers/users.server.controller')

module.exports = function(){
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'name', 'displayName', 'emails'],
        passReqToCallback: true
    }, (req,accessToken, refreshToken, profile, done) =>{
        const provJson = profile._json;
        provJson.accessToken = accessToken
        provJson.refreshToken = refreshToken

        const providerUserProfile = {
            firstName: profile.name.givenName,            
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.emails[0].value.split('@')[0],
            provider: 'facebook',
            providerId: profile.id,
            providerData: provJson
        }

        console.log(`${JSON.stringify(profile,null,4)}`)
        users.saveOAuthUserProfile(req, providerUserProfile,done)
    }))
}