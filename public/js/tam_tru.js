async function checkFamily(get) {
    let submit_btn = document.getElementById('submit-btn');
    let res = await axios.get("http://localhost:3001/familyList/getAllFamily");
    let results = await axios.get("http://localhost:3001/nhankhau/getAllUser");
    let users = results.data;

    //
    let element = document.getElementById('fullName');
    element.innerHTML = null;
    for(let user of users) {
        if(user.ma_ho_khau === +get.value) {
            let item = `<option value="${user.ma_nhan_khau}">${user.ten_nhan_khau}</option>`;
            let data = new DOMParser().parseFromString(item, 'text/html');
            element.append(data.body.firstChild);
        }
    }
    let id_user = document.getElementById('fullName').value;
    document.getElementById('ma_nhan_khau').value = id_user;
    
    //
    let families = res.data;
    let arr = [];
    for(let family of families) {
        arr.push(family.ma_ho_khau);
    }

    let p_tag = get.parentNode.getElementsByTagName('p')[0];

    if(arr.includes(+get.value)) {
        p_tag.innerHTML = "";
        submit_btn.disabled = false;

    }
    else {
        p_tag.innerHTML = 'Mã hộ không tồn tại!';
        submit_btn.disabled = true;
    }

    if(get.value == '') {
        p_tag.innerHTML = '';
        submit_btn.disabled = false;
    }

}
async function checkUser(get) {
    let submit_btn = document.getElementById('submit-btn');
    let res = await axios.get("http://localhost:3001/nhankhau/getAllUser");
    let users = res.data;
    let arr = [];
    for(let user of users) {
        arr.push(user.ma_nhan_khau);
    }

    let p_tag = get.parentNode.getElementsByTagName('p')[0];

    if(arr.includes(+get.value)) {
        p_tag.innerHTML = 'Mã nhân khẩu đã tồn tại!';
        submit_btn.disabled = true;
    }
    else {
        p_tag.innerHTML = "";
        submit_btn.disabled = false;
    }

    if(get.value == '') {
        p_tag.innerHTML = '';
        submit_btn.disabled = false;
    }

}

function valueIsEmpty(get) {
    let submit_btn = document.getElementById('submit-btn');
    
    let p_tag = get.parentNode.getElementsByTagName('p')[0];

    if(get.value == '') {
        p_tag.innerHTML = '';
        submit_btn.disabled = false;
        document.getElementById('fullName').innerHTML = `<option>---</option>`;
    }
}

function checkValidCMND(get) {
    let submit_btn = document.getElementById('submit-btn');

    let p_tag = get.parentNode.getElementsByTagName('p')[0];
    
    if(get.value === "Chưa có" || get.value === "Mới sinh") {
        p_tag.innerHTML = "";
        submit_btn.disabled = false;
    }
    else if (typeof +get.value === "number") {
        if(get.value.length != 12) {
            p_tag.innerHTML = 'Số CCCD có 12 ký tự!';
            submit_btn.disabled = true;
        }
        else {
            p_tag.innerHTML = "";
            submit_btn.disabled = false;
        }
    }

    if(get.value == '') {
        p_tag.innerHTML = '';
        submit_btn.disabled = false;
    }
}

function checkValidDate(get) {
    let submit_btn = document.getElementById('submit-btn');
    let fromDate = document.getElementById('fromDate').value;
    let toDate = document.getElementById('toDate').value;

    if( fromDate && toDate) {
        let from = new Date(fromDate);
        let to = new Date(toDate);
        let time = to.getTime() - from.getTime();
        let countTime = time/(1000*3600*24);
        if( countTime >= 30 && countTime <= 730) {
            submit_btn.disabled = false;
        }
        else {
            submit_btn.disabled = true;
        }
    }

}

function checkValidDateVang(get) {
    let submit_btn = document.getElementById('submit-btn');
    let fromDate = document.getElementById('fromDate').value;
    let toDate = document.getElementById('toDate').value;

    if( fromDate && toDate) {
        let from = new Date(fromDate);
        let to = new Date(toDate);
        let time = to.getTime() - from.getTime();
        let countTime = time/(1000*3600*24);
        if( countTime >= 1) {
            submit_btn.disabled = false;
        }
        else {
            submit_btn.disabled = true;
        }
    }

}
function selectIdUser(get) {
    let id_user = document.getElementById('fullName').value;
    document.getElementById('ma_nhan_khau').value = id_user; 
}
