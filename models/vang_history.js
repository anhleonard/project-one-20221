let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vangHistory = new Schema({
    ma_ho_khau: Number,
    ma_nhan_khau: Number,
    fullName: String,
    birthDay: String,
    gentle: String,
    cmndNumber: String,
    curAddress: String,
    fromDate: String,
    toDate: String,
    reason: String,
})

module.exports = mongoose.model('VangHistory',vangHistory);