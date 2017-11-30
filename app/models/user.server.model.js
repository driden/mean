const mongoose = require('mongoose')
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
UserSchema.virtual('fullName')
    .get(() => this.firstName + ' ' + this.lastName)
    .set((fullName) => {
        const splitName = fullName.split(' ')
        firstName = splitName[0] || ''
        lastName = splitName[1] || ''
    })

UserSchema.statics.findOneByUsername = (username, callback) => this.findOne( {username: new RegExp(username, 'i')}, callback)
UserSchema.methods.authenticate = (password) => this.password === password
UserSchema.set('toJSON',{getters:true})
mongoose.model('User',UserSchema)