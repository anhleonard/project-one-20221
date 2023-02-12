let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let fees = new Schema({
    feeName: String,
    require: {type: String, default: null},
    average: {type: Number, default: null},
    sumMoney: Number,
    sumFamily: Number,
})

module.exports = mongoose.model('Fee', fees);