const { response } = require('express');
let VangHistory = require('../models/vang_history');
let TruHistory = require('../models/tru_history');
let User = require('../models/user');
let Family = require('../models/family');

let paperController = {
    paperTamVang: async (req,res) => {
        res.render('papers/tam_vang');
    },
    paperTamTru: async (req,res) => {
        res.render('papers/tam_tru');
    },
    paperVangHistories: async (req,res) => {
        let body = req.body;
        let id_user = +body.ma_nhan_khau;
        let id_family = +body.ma_ho_khau;
        let user = await User.findOne({ma_nhan_khau: id_user});
        let family = await Family.findOne({ma_ho_khau: id_family});
        
        let curAddress =
        family.so_nha +
        " - " +
        family.ten_duong +
        " - " +
        family.ten_phuong +
        " - " +
        family.ten_quan;

        let additionalInfo = {
            fullName: user.ten_nhan_khau,
            birthDay: user.birthday,
            gentle: user.gentle,
            cmndNumber: user.cmndNumber,
            curAddress: curAddress,
        }

        let newInfo = {...body, ...additionalInfo};
        console.log(newInfo);
        let newHis = new VangHistory(newInfo);
        await newHis.save();
        res.redirect('/papers/giay_tam_vang');
    },
    paperTruHistories: async (req,res) => {
        let body = req.body;
        let newHis = new TruHistory(body);
        await newHis.save();
        res.redirect('/papers/giay_tam_tru');
    },
    getAllPaperHistory: async (req,res) => {
        let data = await VangHistory.find({});
        res.json(data);
    }
}

module.exports = paperController;