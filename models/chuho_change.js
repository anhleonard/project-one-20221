let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newChuho = new Schema({
    ma_ho_khau: Number,
    date_thay_doi: String,
    old_chu_ho: String,
    new_chu_ho: String,
    reason: String,
})

module.exports = mongoose.model('ChuHoHistory', newChuho);