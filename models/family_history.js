let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let familyHistory = new Schema({
    ma_ho_khau: Number,
    ma_chu_ho: { type: Number, unique: true},
    person: [
        {
            ma_nhan_khau: { type: Number },
            ten_nhan_khau: String,
            status: String,
            noi_chuyen_di: { type: String, default: ""},
            date_mat: { type: String, default: null},
            date_chuyen_di: String,
            noi_chuyen_toi: String,
            text_note: { type: String, default: ""},
        }
    ]
})
module.exports = mongoose.model('FamilyHistory', familyHistory);