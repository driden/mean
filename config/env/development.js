module.exports = {
    // Development configuration options
    sessionSecret: 'developmentSessionSecret',
    db: 'mongodb://localhost/mean-book',
    facebook: {
        clientID: '1754474704585696',
        clientSecret: 'fc39c3776f71ebfd6d8a0c9e083e97c6',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    }
}