let Family = require("../models/family");
let User = require("../models/user");
let Tru_History = require("../models/tru_history");
let Vang_History = require("../models/vang_history");
let FamilyHistory = require("../models/family_history");
let ChuHoHistory = require("../models/chuho_change");

let historyController = {
    getHistoryTru: async (req, res, next) => {
        let id = +req.params.id;
        let datas = await Tru_History.find({ma_ho_khau: id});
        res.render('histories/tam_tru_his', {datas: datas, id: id});
    },
    getHistoryVang: async (req, res, next) => {
        let id = req.params.id;
        let datas = await Vang_History.find({ma_ho_khau: id});
        res.render('histories/tam_vang_his', {datas: datas, id: id});
    },
    allHistories: async (req, res) => {
        let id_family = req.params.id;
        let chuhos = await ChuHoHistory.find({ma_ho_khau: id_family});
        let chuho_history;
        let empty_chuho = [];
        if(chuhos) {
          for(let chuho of chuhos) {
            let old_info = chuho.old_chu_ho.split(' - ');
            let new_info = chuho.new_chu_ho.split(' - ');

            chuho_history = {
              old_name: old_info[0],
              old_id: +old_info[1],
              new_name: new_info[0],
              new_id: +new_info[1],
              date_thay_doi: chuho.date_thay_doi,
            }
            empty_chuho.push(chuho_history);
          }
        }
        //
        let family_history = await FamilyHistory.findOne({ma_ho_khau: id_family});
      
        if(family_history) {
          let invalidPeople = family_history.person;

          let datas = [];
          for (let person of invalidPeople) {
            let findName = person.ten_nhan_khau;
            if(person.status === 'da_chuyen') {
              let infor_person = {
                ma_nhan_khau: person.ma_nhan_khau,
                ten_nhan_khau: findName,
                status: "Đã chuyển",
                date_chuyen_di: person.date_chuyen_di,
                noi_chuyen_toi: person.noi_chuyen_toi,
              }
              datas.push(infor_person);
            }
            else if(person.status === 'da_mat') {
              let infor_person = {
                ma_nhan_khau: person.ma_nhan_khau,
                ten_nhan_khau: findName,
                status: "Đã mất",
                date_mat: person.date_mat,
                date_chuyen_di: null,
                noi_chuyen_toi: null,
              }
              datas.push(infor_person);
            }
            else if(person.status == "dang_sinh_song") continue;
          }
          res.render('histories/change_histories', {family_history: datas, chuho_history: empty_chuho, id_family: id_family})
        }
        else {
          res.send('LỊCH SỬ THAY ĐỔI NHÂN KHẨU TRỐNG');
        }
      }
}

module.exports = historyController;