let Family = require("../models/family");
let User = require("../models/user");
let FamilyHistory = require("../models/family_history");

let createFamilyController = {
    createFamily: async (req, res) => {
        let body = req.body;
        let users = await User.find({});

        let name_chuho;
        let people = [];
        people.push({ma_nhan_khau: +body.chuho});

        for(let user of users){
            if(user.ma_nhan_khau === +body.chuho) {
                await User.findOneAndUpdate({ma_nhan_khau: +body.chuho}, {role: 'on', relation: null});
            }
        }
        
        if(body.members) {
            for(let member of body.members) {
                let str_member = member.split('_');
                await User.findOneAndUpdate({ma_nhan_khau: +str_member[1]}, {relation: str_member[0]});
            }
            body.members.forEach( member => {
                let str_member = member.split('_');
                people.push({ma_nhan_khau: +str_member[1]})
            })
        }
        
        //lưu gia đình mới
        let family = {
            ma_ho_khau: +body.id_ho_khau,
            ma_chu_ho: +body.chuho,
            person: people,
            so_nha: +body.family_number,
            ten_duong: body.street_name,
            ten_phuong: body.ward_name,
            ten_quan: body.district_name,
        }
        let newFamily = new Family(family);
        await newFamily.save();

        //lưu lịch sử chỉnh sửa
        for(let getUser of people) {
            let id_user = getUser.ma_nhan_khau;
            let user = await User.findOne({ma_nhan_khau: id_user});
            let userInFamily = await Family.findOne({ma_ho_khau: user.ma_ho_khau});
            
            let members = userInFamily.person;
            let historyArr = [];

            let date = new Date();
            let today;
            if(date.getMonth() == 0 || date.getMonth() == 10) {
                let month = date.getMonth() + 1;
                today = date.getFullYear() + '-' + month + '-' + date.getDate();
            }
            else {
                today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
            }

            let fullName;

            for(let member of members) {
                if( member.ma_nhan_khau === +id_user) {
                    for(let user of users) {
                        if( user.ma_nhan_khau === +id_user) {
                            fullName = user.ten_nhan_khau;
                        }
                    }
                    let info_history = {
                        ma_nhan_khau: member.ma_nhan_khau,
                        ten_nhan_khau: fullName,
                        status: 'da_chuyen',
                        noi_chuyen_di: "Mã hộ cũ: " + user.ma_ho_khau,
                        date_chuyen_di: today,
                        noi_chuyen_toi: "Mã hộ mới: " + (+body.id_ho_khau),
                    }
                    historyArr.push(info_history);
                }
            }

            let validHistory = await FamilyHistory.findOne({ma_ho_khau: user.ma_ho_khau});
            if(validHistory) {
                let newPerson = [...validHistory.person, ...historyArr];
                await FamilyHistory.updateOne({ma_ho_khau: user.ma_ho_khau}, {person: newPerson});
            }
            else {
                let family_history = {
                    ma_ho_khau: +user.ma_ho_khau,
                    ma_chu_ho: +body.chuho,
                    person: historyArr,
                }
                let new_his = new FamilyHistory(family_history);
                await new_his.save();
            }
        }
        // xóa nhân khẩu trong hộ cũ
        let i = 0;
        for(let getUser of people) {
            let id_user = getUser.ma_nhan_khau;
            let user = await User.findOne({ma_nhan_khau: id_user});
            let userInFamily = await Family.findOne({ma_ho_khau: user.ma_ho_khau});
    
            let members = userInFamily.person;
            let personArr = [];
            for(let member of members) {
                if( member.ma_nhan_khau !== +id_user) {
                    personArr.push(member);
                }
            }
            //
            await Family.findOneAndUpdate({ma_ho_khau: user.ma_ho_khau}, {person: personArr});
            await User.updateOne({ma_nhan_khau: id_user},{ma_ho_khau: +body.id_ho_khau});
        }
        res.redirect('/familyList');

    }
}

module.exports = createFamilyController;