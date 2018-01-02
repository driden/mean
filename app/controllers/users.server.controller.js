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

exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            res.status(400).send(info)
        } else {
            user.password = undefined
            user.salt = undefined

            req.login(user, (err) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    res.json(user)
                }
            })
        }
    })(req, res, next)
}

exports.signup = (req, res, next) => {

    const user = new User(req.body)
    user.provider = 'local'

    user.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            })
        } else {
            user.password = undefined
            user.salt = undefined

            req.login(user, (err) => {
                if (err) {
                    res.status(400).send(err)
                } else {
                    res.json(user)
                }
            })
        }        
    })
}

exports.signout = (req, res) => {
    req.logout()
    res.redirect('/')
}

exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, user) => {

        if (err) return done(err)

        if (!user) {
            const possibleUsername =
                profile.username || ((profile.email) ? profile.email.split('@')[0] : '')

            User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                const newUser = new User(profile)
                newUser.username = availableUsername
                newUser.save((err) => {
                    if (err) {
                        const message = _this.getErrorMessage(err)
                        req.flash('error', message)
                        return res.redirect('/signup')
                    }
                    return done(err, newUser)
                })
            })
        } else
            return done(err, user)

    })
}