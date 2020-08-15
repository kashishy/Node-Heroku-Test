var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//with mongoose population, it will have firstname and lastname apart from username and password
var User = new Schema ({
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        email: {
            type: String
        }
    },
    { timestamps: true }
);

//for including required things in schema 
//it will add username and hashed passport support and also add many function support
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);