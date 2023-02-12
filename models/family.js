let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let chuhoSchema = new Schema({
    ma_ho_khau : { type: Number, unique: true},
    ma_chu_ho: {type: Number, unique: true},
    person: [
        {
            _id: false,
            ma_nhan_khau: {type: Number},
            status: {type: String, default: 'dang_sinh_song'},
            date_chuyen_di: String,
            noi_chuyen_toi: String,
            text_note: String,
        }
    ],
    so_nha: { type: Number, unique: true},
    ten_duong: String,
    ten_phuong: String,
    ten_quan: String,
})

module.exports = mongoose.model('Family', chuhoSchema);