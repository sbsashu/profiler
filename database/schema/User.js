let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    }
})

let newUser = mongoose.model('users', User)
module.exports = {
    newUser
}