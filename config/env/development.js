module.exports = {
    // Development configuration options
    sessionSecret: 'developmentSessionSecret',
    db: 'mongodb://localhost/mean-book',
    facebook: {
        clientID: '1754474704585696',
        clientSecret: 'fc39c3776f71ebfd6d8a0c9e083e97c6',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'WGHqK4Qu4xAyeyVa68isqlbj9',
        clientSecret: 'zloltLmIAq9rPzdQxUU3DO0VByqgzWXXg33h16bEjwFHEBfiHy',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google:{
        clientID: '511500385898-v6ir4uhnru86qgvvvcmcehi8e632h193.apps.googleusercontent.com',
        clientSecret: 'Z6mG7JHfADwcgffyyldf7sh2',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
}