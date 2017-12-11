const passport = require('passport')
const mongoose = require('mongoose')

module.exports = () => {

    const User = mongoose.model('User')

    passport.serializeUser(
        (user, done) => done(null,user.id)
    )

    passport.deserializeUser(
        (id,done) => {
            User.findOne({_id:id}, '-password -salt', 
                            (err,user)=>done(err,user)
            )
        }
    )
    
    require('./strategies/local')()
    require('./strategies/facebook')()
    require('./strategies/twitter')()
    require('./strategies/google')()
}