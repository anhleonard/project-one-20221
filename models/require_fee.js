let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RequireFees = new Schema({
    ma_ho_khau: Number,
    ten_chu_ho: String,
    feeName: String,
    tongTien: Number,
})

module.exports = mongoose.model('RequireFees', RequireFees);