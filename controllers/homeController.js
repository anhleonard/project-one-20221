let mongoose = require('mongoose');
const User = require('../models/user')
let people = [];


const homeController = {
    homePage: async (req,res) => {
        res.render('home');
    },
    khoanphiPage: async (req,res) => {
        res.json('Đây là trang khoản phí.');
    },
    dongphiPage: async (req,res) => {
        res.json('Đây là trang đóng phí.');
    },
    thongkePage: async (req,res) => {
        res.json('Đây là trang thống kê.');
    },
}

module.exports = homeController;