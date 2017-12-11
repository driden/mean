const crypto = require('crypto');
const mongoose = require('mongoose')
const Buffer = require('buffer').Buffer
const passwordSalt = require('./salt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
       type: String,
       trim: true,
       unique: true,
       required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner','User']
    },
    password: {
        type:String,
        validate:[
            (password) => password.length >= 6,'Password should be longer than 5 characters'
        ]
    },
    salt:{
        type: String,
        
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    website:{
        type: String,
        get: (url) =>{
            
            if(!url) return url

            if (url.indexOf('http://')!== 0 && url.indexOf('https://')!== 0)
                url = 'http://' + url
            return url
        }
    }

})

UserSchema.methods.hashPassword = function(password) {
    let buffedSalt = Buffer.from(passwordSalt,'utf8')
    const hashed =crypto.pbkdf2Sync(password, buffedSalt, 10000,64,'sha512').toString('base64')
    console.log("password: " + password + " hash: "+ hashed)
    return hashed
}

UserSchema.virtual('fullName')
    .get(function(){
        let full = this.firstName + ' ' + this.lastName
        if(typeof this.firstName === "undefined") full = this.username
        return full
    })
    .set(function (fullName) {
        const splitName = fullName.split(' ')
        firstName = splitName[0] || ''
        lastName = splitName[1] || ''
    })

UserSchema.pre('save', function(next) {
    if (this.password){
        //this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64')
        this.password = this.hashPassword(this.password)
    }
    next()
})

UserSchema.methods.authenticate = 
        function (password) {
            return this.password === this.hashPassword(password)
        }

UserSchema.statics.findUniqueUsername = 
    function (username, suffix, callback) {
        let possibleUsername = username + (suffix || '')
        this.findOne({username: possibleUsername},
            function (err,user) {
            if(!err){
                if(!user)
                    callback(possibleUsername)
                else
                    return this.findUniqueUsername(username,(suffix || 0),1,callback)
            }else
                callback(null)
            }
        )
}

UserSchema.set('toJSON',{getters:true, virtuals:true})
mongoose.model('User',UserSchema)