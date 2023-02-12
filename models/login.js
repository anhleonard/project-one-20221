let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let loginSchema = new Schema({
    username: { type: String, unique: true},
    password: { type: String, unique: true},
})

module.exports = mongoose.model('Login', loginSchema);