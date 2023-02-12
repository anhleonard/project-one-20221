let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    ma_ho_khau: Number,
    ma_nhan_khau : { type: Number, unique: true},
    ten_nhan_khau : String,
    gentle: String,
    bi_danh: String,
    birthday: String,
    noi_sinh: String,
    nguyen_quan:String,
    dan_toc: String,
    nghe_nghiep: String,
    noi_lam_viec: String,
    cmndNumber: { type: String},
    ngay_cap_cmnd: String,
    noi_cap_cmnd: String,
    date_thuong_tru: String,
    before_live: String,
    relation: String,
    role: String,
})

module.exports = mongoose.model('User', userSchema);