let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let otherFees = new Schema({
    feeName: String,
    ma_ho_khau: Number,
    ten_chu_ho: String,
    total_money: Number,
})

module.exports = mongoose.model('OtherFees', otherFees);