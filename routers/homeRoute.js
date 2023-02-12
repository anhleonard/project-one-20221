let express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const familyController = require('../controllers/familyController');
const paperController = require('../controllers/paperController');
const historyController = require('../controllers/historyController');
const thongkeController = require('../controllers/thongkeController');
const feesController = require('../controllers/feesController');
const createFamilyController = require('../controllers/createFamilyController');
let homeRoute = express.Router();

homeRoute.get('/', homeController.homePage);
//
homeRoute.get('/nhankhau', userController.renderNhanKhauPage);
homeRoute.post('/nhankhau', userController.nhankhauPage);
homeRoute.delete('/nhankhau/delete/:id', userController.deleteUser);
homeRoute.get('/nhankhau/select-update/user/:id', userController.selectUpdateUser);
homeRoute.put('/nhankhau/update/user/:id', userController.updateUser);
homeRoute.post('/nhankhau/search', userController.searchUser)
homeRoute.get('/nhankhau/getAllUser', userController.getAllUser);

//
homeRoute.get('/familyList', familyController.familyList);
homeRoute.get('/familyList/detail_family/:id', familyController.detailFamily);
homeRoute.put('/familyList/detail_family/changeStatus/:id', familyController.changeStatus);
homeRoute.delete('/familyList/detail_family/delete/:id', familyController.deleteUser);
homeRoute.put('/familyList/detail_family/changeRole/:id', familyController.changeRole);
homeRoute.post('/familyList/add_family', familyController.addFamily);
homeRoute.get('/familyList/getAllFamily', familyController.getAllFamily);
homeRoute.post('/create-family', createFamilyController.createFamily);
homeRoute.get('/familyList/deleteFamily/:id', familyController.deleteFamily); //truy cập trang xóa hộ
homeRoute.post('/familyList/removed_family/:id', familyController.removedFamily) // xóa hộ khi còn 1 member
homeRoute.post('/familyList/search_family', familyController.searchFamily) //tìm kiếm hộ gia đình

//
homeRoute.get('/histories/:id', historyController.allHistories);
homeRoute.get('/histories/:id/tam_tru', historyController.getHistoryTru);
homeRoute.get('/histories/:id/tam_vang', historyController.getHistoryVang);
//
homeRoute.get('/papers/giay_tam_vang', paperController.paperTamVang);
homeRoute.get('/papers/giay_tam_tru', paperController.paperTamTru);
homeRoute.post('/papers/histories/tam_vang', paperController.paperVangHistories);
homeRoute.post('/papers/histories/tam_tru', paperController.paperTruHistories);
homeRoute.get('/papers/getAllPaperHistory', paperController.getAllPaperHistory);
//
homeRoute.get('/thongke', thongkeController.thongkeGentle);
homeRoute.get('/thongke/ages', thongkeController.thongkeAges);
homeRoute.get('/thongke/foreigners', thongkeController.thongkeForeigners);
//
homeRoute.get('/fees', feesController.getAllFees); 
homeRoute.post('/fees/addDetailFees', feesController.addDetailFees); //thêm tên, hộ gd, số tiền thu của 1 khoản thu
homeRoute.post('/fees/addFeeName', feesController.addFeeName); // thêm vào model fees 
homeRoute.post('/fees/add_require_fee', feesController.addRequireFee); // thêm phí vs của 1 hộ gd
homeRoute.get('/fees/detail/:id', feesController.getDetailFee); // chi tiết các khoản thu (mới có phí vs)
homeRoute.get('/fees/check_fees/:id', feesController.checkDetailFees); // chi tiết các khoản thu của một hộ

homeRoute.post('/fees/add_activity', feesController.addActivity);
homeRoute.get('/fees/detail_require/', feesController.getDetailRequireFee)
homeRoute.get('/fees/otherFees', feesController.getOtherFees); //get all thông tin của các khoản không bắt buộc

homeRoute.get('/fees/all_fees_in_here', feesController.allFeesInHere);
homeRoute.get('/fees/get_all_require_fees', feesController.allRequireFees);

// homeRoute.get('/khoanphi', homeController.khoanphiPage);
// homeRoute.get('/dongphi', homeController.dongphiPage);
// homeRoute.get('/thongke', homeController.thongkePage);

module.exports = homeRoute;