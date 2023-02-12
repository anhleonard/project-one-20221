
async function getDetailFee(get) {
    let id_family = document.getElementById('ma_ho_khau').value;
    let getRequireFees = await axios.get('http://localhost:3001/fees/get_all_require_fees');
    let requireFees = getRequireFees.data;
    for(let fee of requireFees) {
        if(fee.feeName === get.value && fee.ma_ho_khau === +id_family) {
            document.getElementById('red-alert').innerHTML = 'Hộ này đã đóng tiền phí!';
            document.getElementById('btn-submit').disabled = true;
            break;
        }
        else {
            document.getElementById('red-alert').innerHTML = '';
            document.getElementById('btn-submit').disabled = false;
        }
    }

    let all_fees = await axios.get("http://localhost:3001/fees/all_fees_in_here");
    let fees = all_fees.data;
    for(let fee of fees) {
        if(fee.feeName === get.value) {
            let sumMember = document.getElementsByClassName('sumMember')[0].value;
            document.getElementsByClassName('average')[0].value = fee.average;
            document.getElementsByClassName('average')[1].value = fee.average;
            document.getElementsByClassName('tongTien')[0].value = sumMember*(fee.average)*12;
            document.getElementsByClassName('tongTien')[1].value = sumMember*(fee.average)*12;
        }
    }
}

async function getAllDetail(get) {
    let fee_name = document.getElementById('feeName').value;
    let getRequireFees = await axios.get('http://localhost:3001/fees/get_all_require_fees');
    let requireFees = getRequireFees.data;
    for(let fee of requireFees) {
        if(fee.ma_ho_khau === +get.value && fee.feeName === fee_name) {
            document.getElementById('red-alert').innerHTML = 'Hộ này đã đóng tiền phí!';
            document.getElementById('btn-submit').disabled = true;
            break;
        }
        else {
            document.getElementById('red-alert').innerHTML = '';
            document.getElementById('btn-submit').disabled = false;
        }
    }

    let res = await axios.get("http://localhost:3001/familyList/getAllFamily");
    let families = res.data;
    let value = await axios.get('http://localhost:3001/nhankhau/getAllUser');
    let users = value.data;
    for(let family of families) {
        if(family.ma_ho_khau === +get.value) {
            for(let user of users) {
                if(user.ma_nhan_khau === +family.ma_chu_ho) {
                    document.getElementsByClassName('ten_chu_ho')[0].value = user.ten_nhan_khau;
                    document.getElementsByClassName('ten_chu_ho')[1].value = user.ten_nhan_khau;
                }
            }
            let tb_money = document.getElementsByClassName('average')[0].value;
            document.getElementsByClassName('sumMember')[0].value = family.person.length;
            document.getElementsByClassName('sumMember')[1].value = family.person.length;
            document.getElementsByClassName('tongTien')[0].value = family.person.length*tb_money*12;
            document.getElementsByClassName('tongTien')[1].value = family.person.length*tb_money*12;
        };
    }
}
