let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let truHistory = new Schema({
    ma_ho_khau: Number,
    ma_nhan_khau: Number,
    fullName: String,
    birthDay: String,
    gentle: String,
    cmndNumber: String,
    curAddress: String,
    tempoAddress: String,
    fromDate: String,
    toDate: String,
    reason: String,
})

module.exports = mongoose.model('TruHistory',truHistory);