let Family = require('../models/family');
let Fees = require('../models/fees');
let PhiVeSinh = require('../models/phi_vs');
let OtherFees = require('../models/other_fees');
let RequireFees = require('../models/require_fee');

let feesController = {
    getAllFees: async (req, res, next) => {
        //lấy ra các khoản phí không bắt buộc
        let getAllFees = await Fees.find({});
        if(getAllFees) {
            for(let fee of getAllFees) {
                // phí không bắt buộc
                let example_fee = fee._doc;
                let other_fees = await OtherFees.find({feeName: fee.feeName});
                if(other_fees && !example_fee.require) {
                    let tong_phi = 0;
                    for(let data of other_fees) {
                        tong_phi += data.total_money;
                    }
                    await Fees.updateOne({feeName: fee.feeName}, {sumMoney: tong_phi, sumFamily: other_fees.length});
                }
                //lấy ra các khoản phí bắt buộc
                let require_fees = await RequireFees.find({feeName: fee.feeName});
                if(require_fees && example_fee.require) {
                    let tong_tien = 0;
                    for(let data of require_fees) {
                        tong_tien += data.tongTien;
                    }
                    await Fees.updateOne({feeName: fee.feeName}, {sumMoney: tong_tien, sumFamily: require_fees.length});
                }
            }
            let allFees = await Fees.find({});
            res.render('fees/main_fees', {allFees: allFees});
        }
    },
    addFeeName: async (req, res, next) => {
        let body = req.body;
        let createFee = {
            feeName: body.feeName,
            sumMoney: 0,
            sumFamily: 0,
        }
        let newFee = new Fees(createFee);
        await newFee.save();
        res.redirect('/fees/');
    },
    getDetailFee: async (req, res) => {
        let phi_vs = await PhiVeSinh.find({});
        let id = req.params.id;
        let fee = await Fees.findOne({_id: id});
        if(fee.feeName === "Phí vệ sinh") {
            let allFamily = await Family.find({});
            res.render('fees/phivesinh', {allFamily: allFamily, phi_vs: phi_vs});
        }
        else {
            res.redirect('/fees/otherFees');
        }
    },
    addRequireFee: async (req, res) => {
        let body = req.body;
        let newFee = new RequireFees(body);
        await newFee.save();
        res.redirect('/fees/detail_require');
    },
    getOtherFees: async (req, res) => {
        let families = await Family.find({});
        let fees = await Fees.find({});
        let otherFees = await OtherFees.find({});
        fees = fees.filter(fee => {
            if(!fee.require) return fee;
        });
        res.render('fees/other_fees', {families: families, otherFees: otherFees, fees: fees});
    },
    addDetailFees: async (req, res) => {
        let body = req.body;
        console.log(body);
        let id_family = body.ma_ho_khau;
        let families = await OtherFees.find({ma_ho_khau: +id_family});
        let feeArrayName = [];
        if(families) {
            for(let family of families) {
                feeArrayName.push(family.feeName);
            }
            if(feeArrayName.includes(body.feeName)){
                let sum = 0;
                let family = await OtherFees.findOne({ma_ho_khau: +id_family, feeName: body.feeName});
                sum = family.total_money + +body.total_money;
                console.log(sum);
                await OtherFees.updateOne({ma_ho_khau: +id_family, feeName: body.feeName}, {total_money: sum});
            }
            else {
                let newFee =  OtherFees(body);
                await newFee.save();
            }
        }
        else {
            let newFee =  OtherFees(body);
            await newFee.save();
        }
        res.redirect('/fees/otherFees');
    },
    checkDetailFees: async (req, res) => {
        let id_family = +req.params.id;
        let require_fees_family = await RequireFees.find({ma_ho_khau: id_family});
        let other_fees_family = await OtherFees.find({ma_ho_khau: id_family});
        res.render('fees/detail_fee', {require_fees: require_fees_family, other_fees: other_fees_family, id_family: id_family});
    },
    addActivity: async (req, res) => {
        let body = req.body;
        
        let createFee = {
            feeName: body.name_activity,
            sumMoney: 0,
            sumFamily: 0,
            average: body.money,
            require: body.require
        }

        let newFee = new Fees(createFee);
        await newFee.save();
        res.redirect('/fees/');
    },
    getDetailRequireFee: async (req, res) => {
        let require_fees = [];
        let fees = await Fees.find({});
        let families = await Family.find({});
        let requireFees = await RequireFees.find({});
        for(let fee of fees) {
            if(fee.require) {
                require_fees.push(fee);
            }
        }
        res.render('fees/require_fees', {fees: require_fees, families: families, requireFees: requireFees});
    },
    allFeesInHere: async(req, res) => {
        let all_fees = await Fees.find({});
        res.json(all_fees);
    },
    allRequireFees: async(req, res) => {
        let requireFees = await RequireFees.find({});
        res.json(requireFees);
    }
}

module.exports = feesController;