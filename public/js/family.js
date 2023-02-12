function exit(event, get) {
    if(event.target === event.currentTarget) {
      get.style.display = 'none';
    }
    else {
      return;
    }
}

function checkFamily(get) {
    let submit_btn = document.getElementById('add-family-btn-input');
    let p_tag = get.parentNode.getElementsByTagName('p')[0];
    axios.get("http://localhost:3001/familyList/getAllFamily").then(function (res) {
        let families = res.data;
        let arr = [];
        for(let family of families) {
            arr.push(family.ma_ho_khau);
        }
        if(arr.includes(+get.value)) {
            p_tag.innerHTML = "Mã hộ khẩu này đã tồn tại!";
            submit_btn.disabled = true;
        }
        else {
            p_tag.innerHTML = "";
            submit_btn.disabled = false;
        }
    })
}

function checkValidFamily(get) {
    let value = get.value;
    let submit_btn = document.getElementById('add-family-btn-input');
    let p_tag = get.parentNode.getElementsByTagName('p')[0];

    if(value !== "" && (value > 99999999 || value < 10000000)) {
        p_tag.innerHTML = 'Mã hộ khẩu phải thuộc dải 10000000 - 99999999';
        submit_btn.disabled = true;
    }
    else {
        p_tag.innerHTML = "";
        submit_btn.disabled = false;
    }
}

function checkUser(get) {
    let submit_btn = document.getElementById('add-family-btn-input');
    let p_tag = get.parentNode.getElementsByTagName('p')[0];
    axios.get('http://localhost:3001/nhankhau/getAllUser').then( res => {
        let users = res.data;
        let arr = [];
        for(let user of users) {
            arr.push(user.ma_nhan_khau);
        }
        if(get.value !== "") {
            if(arr.includes(+get.value)){
                for(let person of users) {
                    if(person.ma_ho_khau && person.ma_nhan_khau === +get.value) {
                        p_tag.innerHTML = 'Nhân khẩu này đã có hộ khẩu!';
                        submit_btn.disabled = true;
                    }
                    else if (person.ma_ho_khau == null && person.ma_nhan_khau === +get.value) {
                        p_tag.innerHTML = '';
                        submit_btn.disabled = false;
                        document.getElementsByClassName('ten_chu_ho')[0].value = person.ten_nhan_khau;
                    }
                }
            }
            else {
                p_tag.innerHTML = 'Nhân khẩu này không tồn tại!';
                submit_btn.disabled = true;
                document.getElementsByClassName('ten_chu_ho')[0].value = null;
            }
        } 
        else {
            p_tag.innerHTML = '';
            submit_btn.disabled = false;
            document.getElementsByClassName('ten_chu_ho')[0].value = null;
        }       
    })
}

async function checkNumberMembers(event,get) {
    let id_family = get.id;
    let results = await axios.get("http://localhost:3001/familyList/getAllFamily");
    let families = results.data;
    for (let family of families) {
        if (family.ma_ho_khau == id_family) {
            let length = family.person.length;
            if(length > 1) {
                alert('Số thành viên trong gia đình > 1!');
            }
            else {
                get.type = 'submit';
                let delete_button = get.form;
                delete_button.action = '/familyList/deleteFamily/' + id_family + '?_method=GET';
                delete_button.submit();
            }
        }
    }
}

