let User = require("../models/user");
let Family = require("../models/family");
let moment = require("moment");

let userController = {
  nhankhauPage: async (req, res) => {
    let body = req.body;
    if(body.role) {
      let newUser = new User(body);
      await newUser.save();
      let createFamily = {
        ma_ho_khau: body.ma_ho_khau,
        ma_chu_ho: body.ma_nhan_khau,
        person : [
          {
            ma_nhan_khau: body.ma_nhan_khau,
          }
        ],
        so_nha: body.so_nha,
        ten_duong: body.ten_duong,
        ten_phuong: body.ten_phuong,
        ten_quan: body.ten_quan,
      }
      let newFamily = new Family(createFamily);
      await newFamily.save();
      res.redirect("/nhankhau");
    }
    else {
      let families = await Family.findOne({ma_ho_khau: body.ma_ho_khau});
      if(families) {
        let newUser = new User(body);
        await newUser.save();
        families.person.push(
          {
            ma_nhan_khau: newUser.ma_nhan_khau,
          }
        )
        await Family.updateOne({ma_ho_khau: body.ma_ho_khau}, families);
        res.redirect("/nhankhau");
      }
      else {
        res.json('Ho khau tren khong ton tai! Vui long them ho khau moi');
      }
    }
  },
  renderNhanKhauPage: async (req, res) => {
    let users = await User.find({});
    res.render("nhankhau/nhankhau", { users: users });
  },
  deleteUser: async (req, res) => {
    let string_id = req.params.id;
    
    let arr_id = string_id.split("&selectAllUser[]=");
    arr_id.shift();
    for (let id_user of arr_id) {
      let id = +id_user;
      
      // xóa nk trong family
      let user = await User.findOne({ ma_nhan_khau: id });
      let user_in_family = await Family.findOne({ma_ho_khau: user.ma_ho_khau});
      let members = user_in_family._doc.person;
      let new_members = [];
      for(let member of members) {
        if(member.ma_nhan_khau !== id) {
          new_members.push(member);
        }
      }
      await Family.updateOne({ma_ho_khau: user.ma_ho_khau}, {person: new_members});

      // xóa nhân khẩu trong user
      await User.deleteOne({ ma_nhan_khau: id });
    }
    res.redirect('/nhankhau');
  },

  selectUpdateUser: async (req, res) => {
    let id = req.params.id;
    let user = await User.findOne({_id: id});
    user = user._doc;
    
    res.render('nhankhau/update_nhankhau', {user: user});
  },

  updateUser: async (req, res) => {
    let user = req.body;
    console.log(user);
    user = {...user, ma_nhan_khau: +user.ma_nhan_khau}
    await User.updateOne({_id: req.params.id}, user);
    res.redirect('/nhankhau');
  },
  searchUser: async(req,res) => {
    let value = req.body;
    let data = value.search_infor;
    let type = value.search_type;
    let arr = [];
    if(type === 'ma_nhan_khau') {
      let person = await User.findOne({ma_nhan_khau: data});
      arr.push(person);
      if(person) {
        res.render('nhankhau/nhankhau',{person: arr, users: null})
      }
    }
    else if (type === 'ten_nhan_khau') {
      let users = await User.find({});
      for(let person of users) {
        let person_name = person.ten_nhan_khau;
        let val = new RegExp(data, 'gi');
        if(person_name.match(val)) {
          arr.push(person);
        }
      }
      if(arr) {
        res.render('nhankhau/nhankhau',{person: arr, users: null})
      }
    }
  },
  getAllUser: async (req, res) => {
    let users = await User.find({});
    res.json(users);
  }
}

module.exports = userController;
