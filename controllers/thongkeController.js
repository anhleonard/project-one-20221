let User =  require("../models/user");
let Vang_History = require("../models/vang_history");
let Tru_History = require("../models/tru_history");

let thongkeController = {
    thongkeGentle: async (req, res) => {
        let body = await User.find({});
        let gender = {
            male: [],
            female: []
        }
        body.forEach( user => {
            if(user.gentle === "Nữ") {
                gender.female.push(user);
            }
            else if(user.gentle === "Nam") {
                gender.male.push(user);
            }
        })
        res.render('thongke/gentle', {gender: gender});
    },
    thongkeAges: async (req, res) => {
        let body = await User.find({});
        let ages = {
            MN: [],
            MG: [],
            C1: [],
            C2: [],
            C3: [],
            WORK: [],
            RETIRE: [],
        };
        body.forEach(user => {
            let age = +user.birthday.slice(0,4);
            let today = new Date();
            let year = today.getFullYear();
            if(year - age <= 3 ) {
                ages.MN.push(user);
            }
            else if(year - age <= 5 ) {
                ages.MG.push(user);
            }
            else if(year - age <= 10) {
                ages.C1.push(user);
            }
            else if(year - age <= 14){
                ages.C2.push(user);
            }
            else if(year - age <= 17) {
                ages.C3.push(user);
            }
            else if(year - age <= 60) {
                ages.WORK.push(user);
            }
            else {
                ages.RETIRE.push(user);
            }
         })
        res.render('thongke/ages', {ages: ages});
    },
    thongkeForeigners: async (req, res) => {
        let datas_tru = await Tru_History.find({});
        let datas_vang = await Vang_History.find({});
        res.render('thongke/foreigners', {datas_tru: datas_tru, datas_vang: datas_vang});
    }
}
module.exports = thongkeController;