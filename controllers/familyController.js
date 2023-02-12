let Family = require("../models/family");
let User = require("../models/user");
let FamilyHistory = require("../models/family_history");
const family = require("../models/family");
let ChuHoHistory = require("../models/chuho_change");
let bcrypt = require("bcrypt");
const { response } = require("express");
const { months } = require("moment/moment");

let familyController = {
  familyList: async (req, res) => {
    let families = [];
    let items = await Family.find({});
    for (let body of items) {
      let countPerson = 0;
      body.person.forEach(person => {
        if(person.status === 'dang_sinh_song') countPerson ++;
      })
      let id_chuho = body.ma_chu_ho;
      let name_chuho;
      let data = await User.findOne({ ma_nhan_khau: id_chuho });
      if (data) {
        name_chuho = data.ten_nhan_khau;
      }
      let address =
        body.so_nha +
        " - " +
        body.ten_duong +
        " - " +
        body.ten_phuong +
        " - " +
        body.ten_quan;
      let user = {
        ma_ho_khau: body.ma_ho_khau,
        ten_chu_ho: name_chuho,
        address: address,
        countPerson: countPerson
      };
      families.push(user);
    }
    res.render("family/family", { families: families});
  },
  detailFamily: async (req, res) => {
    let key = req.params.id;
    let users = await User.find({ma_ho_khau: key});
    // let users = [];
    // for(let user of people) {
    //   if(user.status === 'dang_sinh_song') {
    //     let data = await User.findOne({ma_nhan_khau: user.ma_nhan_khau});
    //     users.push(data);
    //   }
    //   else {
    //     continue;
    //   }
    // }
    res.render("family/detail_family", { users: users, key: key });
  },
  deleteUser: async (req, res) => {
    let id = req.params.id;
    let user = await User.findOne({ ma_nhan_khau: id });
    //xoa o user nhung ma trong family chua xoa
    res.json(user);
  },
  changeStatus: async (req, res) => {
    let value = req.body;
    
    let id = req.params.id;
    let vals = id.match(/\d+/g);
    let id_user = +vals[0];
    let id_family = +vals[1];
    
    //tìm chủ hộ
    let find_family = await Family.findOne({ ma_ho_khau: id_family });
    let find_user = await User.findOne({ma_nhan_khau: id_user});
    let id_chuho = find_family.ma_chu_ho;

    if (value.status === "da_chuyen") {
      let new_informations = {
        ma_nhan_khau: id_user,
        ten_nhan_khau: find_user.ten_nhan_khau,
        status: "da_chuyen",
        date_chuyen_di: value.date_chuyen_di,
        noi_chuyen_toi: value.noi_chuyen_toi,
        text_note: value.text_note,
      }

      let family_history = await FamilyHistory.findOne({ ma_ho_khau: id_family });
      //nếu đã có lịch sử
      if(family_history) {
        //thêm lịch sử di chuyển
        let person_history = family_history._doc.person;
        let new_history = [...person_history, new_informations];
        await FamilyHistory.updateOne({ma_ho_khau: id_family}, {person: new_history});
      }
      // nếu chưa tồn tại lịch sử chỉnh sửa
      else {
        let create_history = {
          ma_ho_khau: id_family,
          ma_chu_ho: +id_chuho,
          person: new_informations,
        }
        let new_his =  new FamilyHistory(create_history);
        await new_his.save();
      }

      // xóa nhân khẩu đó trong db
      await User.findOneAndDelete({ma_nhan_khau: id_user});
  
      // xóa nhân khẩu đó trong hộ cũ
      let family = await Family.findOne({ ma_ho_khau: id_family });
      let new_array_members = [];
      for(let user of family.person) {
        if(user.ma_nhan_khau !== id_user) {
          new_array_members.push(user);
        }
      }
      await Family.updateOne({ ma_ho_khau: id_family }, {person: new_array_members});
      res.redirect('/familyList');
    }
    else if (value.status === "da_mat") {
      let date = new Date();
      let date_die;
      if(date.getMonth() == 0 || date.getMonth() == 10) {
          let month = date.getMonth() + 1;
          date_die = date.getFullYear() + '-' + month + '-' + date.getDate();
      }
      else {
          date_die = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      }
      let new_informations = {
        ma_nhan_khau: id_user,
        ten_nhan_khau: find_user.ten_nhan_khau,
        status: "da_mat",
        date_mat: date_die,
        text_note: value.text_note,
      }
      let family_history = await FamilyHistory.findOne({ ma_ho_khau: id_family });
      //nếu đã có lịch sử
      if(family_history) {
        //thêm lịch sử di chuyển
        let person_history = family_history.person;
        let new_history = [...person_history, new_informations];
        await FamilyHistory.findOneAndUpdate({ma_ho_khau: id_family}, {person: new_history});
      }
      // nếu chưa tồn tại lịch sử chỉnh sửa
      else {
        let create_history = {
          ma_ho_khau: id_family,
          ma_chu_ho: +id_chuho,
          person: new_informations,
        }
        let new_his =  new FamilyHistory(create_history);
        await new_his.save();
      }

      // xóa nhân khẩu đó trong db
      await User.findOneAndDelete({ma_nhan_khau: id_user});
  
      // xóa nhân khẩu đó trong hộ cũ
      let family = await Family.findOne({ ma_ho_khau: id_family });
      let new_array_members = [];
      for(let user of family.person) {
        if(user.ma_nhan_khau !== id_user) {
          new_array_members.push(user);
        }
      }
      await Family.updateOne({ ma_ho_khau: id_family }, {person: new_array_members});
      res.redirect('/familyList');
    }
    else {
      res.redirect('/familyList');
    }
  },
  changeRole: async (req, res) => {
    let id_family = req.params.id;
    let body = req.body;
    let new_id_chuho = +body.new_chu_ho;
    let id_old_chuho = body.old_chu_ho.match(/\d+/g);

    if(body.new_chu_ho == id_old_chuho) {
      res.redirect('/familyList');
    }
    else {
      let relations = body.relation;
      for(let relation of relations) {
        let infos = relation.split('-');
        let id_user = +infos[0];
        let connect = infos[1];
        await User.updateOne({ma_nhan_khau: id_user}, {relation: connect});
      }
  
      let new_info_person = await User.findOne({ma_nhan_khau: new_id_chuho});
      let new_person = new_info_person._doc;
      delete new_person.relation;
      new_person = {...new_person, role: 'on'};
      await User.updateOne({ma_nhan_khau: new_id_chuho}, new_person);
      //
      await User.deleteOne({ma_nhan_khau: id_old_chuho}); // delete chủ hộ cũ
      // //
  
      //
      //update members của gia đình
      let family = await Family.findOne({ma_ho_khau: id_family});
      let new_members = [];
      let members = family._doc.person;
      for(let member of members) {
        if(member.ma_nhan_khau != +id_old_chuho) {
          new_members.push(member);
        }
      }
      await Family.findOneAndUpdate({ma_ho_khau: id_family}, {ma_chu_ho: new_id_chuho, person: new_members});
  
      // lưu lịch sử thay đổi chủ hộ
      req.body['new_chu_ho'] = new_person.ten_nhan_khau + ' - ' + new_person.ma_nhan_khau;
      let newInfor = {...req.body, ma_ho_khau: id_family};
      let newChangeRole = new ChuHoHistory(newInfor);
      await newChangeRole.save();
  
      res.redirect('/familyList');
    }

  },
  getAllFamily: async (req, res) => {
    let datas = await Family.find({});
    res.send(datas);
  },
  addFamily: async (req, res) => {
    await User.findOneAndUpdate({ma_nhan_khau: req.body.ma_chu_ho}, {ma_ho_khau: req.body.ma_ho_khau, role: 'on'});
    let newFamily = {
      ma_ho_khau: req.body.ma_ho_khau,
      ma_chu_ho: req.body.ma_chu_ho,
      ten_chu_ho: req.body.ten_chu_ho,
      person : [
        {
          ma_nhan_khau: req.body.ma_chu_ho,
        }
      ],
      so_nha: req.body.so_nha,
      ten_duong: req.body.ten_duong,
      ten_phuong: req.body.ten_phuong,
      ten_quan: req.body.ten_quan,
    }
    let newData = new Family(newFamily);
    newData.save();
    await res.redirect('/familyList');
  },
  deleteFamily: async (req, res) => {
    let id = +req.params.id;
    let family = await Family.findOne({ma_ho_khau: id});
    let id_chuho = family.person[0].ma_nhan_khau;
    let chuho = await User.findOne({ma_nhan_khau: id_chuho});
    res.render('family/delete_family', {ma_ho_khau: id, ma_chu_ho: id_chuho, ten_chu_ho: chuho.ten_nhan_khau});
  },
  removedFamily: async (req,res) => {
    let body = req.body;

    let user = {...body, ma_nhan_khau: +body.ma_chu_ho}
    delete user.ma_chu_ho;

    let id_family = +body.ma_ho_khau;
    let family_history = await FamilyHistory.findOne({ma_ho_khau: id_family});
    //nếu hộ đã tồn tại
    if(family_history) {
      let members = family_history._doc.person;
      members = [...members, user];
      await FamilyHistory.updateOne({ma_ho_khau: id_family}, {person: members})
    }
    // nếu hộ chưa tồn tại
    else {
      let create_history = {
        ma_ho_khau: id_family,
        ma_chu_ho: +body.ma_chu_ho,
        person: user,
      }
      let new_history = new FamilyHistory(create_history);
      await new_history.save();
    }

    //xóa family đó
    await Family.deleteOne({ma_ho_khau: id_family});
    //xóa chủ hộ đó
    await User.deleteOne({ma_nhan_khau: +body.ma_chu_ho});

    res.redirect('/familyList');
  },
  searchFamily: async (req, res) => {
    let body = req.body;
    let info = body.search_information;
    let option = body.search_option;
    let families = [];
    if(option === 'ma_ho_khau') {
      let family = await Family.findOne({ma_ho_khau: +info});
      
      if (family) {
        let chuho = await User.findOne({ma_nhan_khau: +family.ma_chu_ho});

        let address =
          family.so_nha +
          " - " +
          family.ten_duong +
          " - " +
          family.ten_phuong +
          " - " +
          family.ten_quan;
  
        let createFamily = {
          ma_ho_khau: family.ma_ho_khau,
          ten_chu_ho: chuho.ten_nhan_khau,
          address: address,
          countPerson: family.person.length,
        }
        families.push(createFamily);
  
        res.render('family/family', {families: families});
      }
      else {
        res.send('Không có hộ phù hợp');
      }
    }
    else if(option === 'ten_chu_ho') {
      let selected_families = [];
      let users = await User.find({});
      let arr = [];
      for(let person of users) {
        let person_name = person.ten_nhan_khau;
        let val = new RegExp(info, 'gi');
        if(person_name.match(val)) {
          let family = await Family.findOne({ma_ho_khau: person.ma_ho_khau});
          arr.push(family);
        }
      }
      if(arr) {
        for(let family of arr) {
  
          let chuho = await User.findOne({ma_nhan_khau: +family.ma_chu_ho});
  
          let address =
            family.so_nha +
            " - " +
            family.ten_duong +
            " - " +
            family.ten_phuong +
            " - " +
            family.ten_quan;
    
          let createFamily = {
            ma_ho_khau: family.ma_ho_khau,
            ten_chu_ho: chuho.ten_nhan_khau,
            address: address,
            countPerson: family.person.length,
          }
          selected_families.push(createFamily);
        }
  
        res.render('family/family', {families: selected_families});
      
      }
    }
  }
};
module.exports = familyController;
