const User = require('mongoose').model('User')
const passport = require('passport')

function getErrorMessage(err) {
    let message = ''

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists'
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors)
            if (err.errors[errName].message)
                message = err.errors[errName].message
    }

    return message
}

exports.signin = (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if (err || user){
            res.status(400).send(info)
        } else {
            user.password = undefined
            user.salt = undefined

            req.login(user, (err) => {
                if (err){
                    res.status(400).send(err)
                } else {
                    res.json(user)
                }
            })
        }
    }) (req, res, next)
}

exports.renderSignin = (req, res, next) => {
    if (!req.user)
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        })
    else
        return res.redirect('/')
}

exports.renderSignup = (req, res, next) => {
    if (!req.user)
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        })
    else
        return res.redirect('/')
}

exports.signup = (req, res, next) => {
    if (!req.user) {
        const user = new User(req.body)
        user.provider = 'local'

        user.save((err) => {
            if (err) {
                const message = getErrorMessage(err)

                req.flash('error', message)
                return res.redirect('/signup')
            }
            req.login(user, (err) => {
                if (err) return next(err)
                return res.redirect('/')
            })
        })
    } else return res.redirect('/')
}

exports.signout = (req, res) => {
    req.logout()
    res.redirect('/')
}

exports.saveOAuthUserProfile = function(req, profile, done){
    User.findOne({
        provider : profile.provider,
        providerId: profile.providerId
    }, (err, user) =>{
        
        if(err) return done(err)

        if (!user) {
            const possibleUsername = 
                profile.username || ((profile.email) ? profile.email.split('@')[0] : '')

            User.findUniqueUsername(possibleUsername,null, (availableUsername) => {
                const newUser = new User(profile)
                newUser.username = availableUsername
                newUser.save((err) => {
                    if (err) {
                        const message = _this.getErrorMessage(err)
                        req.flash('error',message)
                        return res.redirect('/signup')
                    }
                    return done(err, newUser)
                })
            })
        } else
           return done(err,user)
           
    })
}