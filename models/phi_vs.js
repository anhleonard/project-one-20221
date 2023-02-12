let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let phiVS = new Schema({
    ma_ho_khau: Number,
    ten_chu_ho: String,
    tongTien: Number,
})

module.exports = mongoose.model('PhiVeSinh', phiVS);