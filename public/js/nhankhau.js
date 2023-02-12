function addPeople() {
  let add_people = document.getElementsByClassName("form-add")[0];
  add_people.style.display = 'block';
}
function selectAllBox() {
  let userCheckBox = document.querySelectorAll('[name="selectAllUser[]"]');

  let inputBoxNotDisabled = [];
  for(let box of userCheckBox) {
    if(!box.disabled) inputBoxNotDisabled.push(box);
  }

  let ele = document.getElementById("checkbox-all");
  let isSelectAll = ele.checked;
  //
  let deleteUser = document.getElementsByClassName("delete-people-title")[0];
  let newFamilyBtn = document.getElementsByClassName("create-new-family")[0];
  
  if (isSelectAll && inputBoxNotDisabled.length > 0) {
    userCheckBox.forEach((item) => {
      if(item.disabled === false) {
        item.checked = true;
      }
    });
    deleteUser.disabled = false;
    newFamilyBtn.disabled = false;
  } else {
    userCheckBox.forEach((item) => {
      item.checked = false;
    });
    deleteUser.disabled = true;
    newFamilyBtn.disabled = true;
  }
}

async function myCheck(get) {
  let resUsers = await axios.get('http://localhost:3001/nhankhau/getAllUser');
  let users = resUsers.data;
  let numberChuho = 0;
  users.forEach(user => {
    if(user.role === 'on'){
      numberChuho++;
    }
  })

  let userCheckBox = document.querySelectorAll('[name="selectAllUser[]"]');

  
  let countUser = document.querySelectorAll(
    '[name="selectAllUser[]"]:checked'
    ).length;
  
  let deleteUser = document.getElementsByClassName("delete-people-title")[0];
  let newFamilyBtn = document.getElementsByClassName("create-new-family")[0];
  if (countUser != 0) {
    deleteUser.disabled = false;
    newFamilyBtn.disabled = false;
  } else {
    deleteUser.disabled = true;
    newFamilyBtn.disabled = true;
  }
  let isChecked = userCheckBox.length === countUser + numberChuho;
  if (isChecked) {
    document.getElementById("checkbox-all").checked = true;
  } else {
    document.getElementById("checkbox-all").checked = false;
  }
}
function cancelBtn() {
  let deleteForm = document.getElementsByClassName("form-alert")[0];
  deleteForm.style.display = "none";
}

function deletePeople() {
  let deleteForm = document.getElementsByClassName("form-alert")[0];
  deleteForm.style.display = "block";
}
function deleteBtn() {
  let Users = document.querySelectorAll('[name="selectAllUser[]"]:checked');
  let string = '';
  Users.forEach( user => {
    string = string + '&selectAllUser%5B%5D=' + user.value ;
  })
  let formDelete = document.getElementsByClassName('form-delete')[0];
  formDelete.action = '/nhankhau/delete/' + string + '?_method=DELETE';
}
function isRole() {
  let isRole = document.getElementById('role').checked;
  if(isRole) {
    document.getElementById('relation').disabled = true;
    document.getElementsByClassName('isChuho')[0].style.display = 'block';
    document.getElementById('ten_quan').required = true;
    document.getElementById('ten_phuong').required = true;
    document.getElementById('ten_duong').required = true;
    document.getElementById('so_nha').required = true;
  }
  else {
    document.getElementById('relation').disabled = false;
    document.getElementsByClassName('isChuho')[0].style.display = 'none';
    document.getElementById('ten_quan').required = false;
    document.getElementById('ten_phuong').required = false;
    document.getElementById('ten_duong').required = false;
    document.getElementById('so_nha').required = false;
  }
}
//
function checkValidId(get) {
  let p_tag = get.parentNode.parentNode.getElementsByTagName('p')[0];
  if(get.value !== "") {
    if (get.value < 100000 || get.value > 999999) {
      p_tag.innerHTML = "Mã nhân khẩu không hợp lệ!";
      get.style.border = '2px solid red';
      document.getElementById('submit-btn-end').disabled = true;
    }
    else {
      document.getElementById('submit-btn-end').disabled = false;
    }
  }
  else {
    document.getElementById('submit-btn-end').disabled = false;
  }
  
}
function checkUpperText(get) {
  let text = get.value;
  let arrs = text.split(" ");
  let newArr = arrs.map( name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
  })
  get.value = newArr.join(" ");
}
function checkUpperFirstLetter(get) {
  let text = get.value;
  get.value = text.charAt(0).toUpperCase() + text.slice(1);
}
async function checkValidDate(get) {
  let endBtn = document.getElementById('submit-btn-end');
  let element = document.getElementById('ma_ho_khau');
  let birthdayInput = document.getElementById('birthday');
  let relation = document.getElementById('relation');
  let p_tag = birthdayInput.parentNode.getElementsByTagName('p')[0];
  let career = document.getElementById("nghe_nghiep");
  let isChuho = document.getElementById('role');

  let birthDate = birthdayInput.value;
  
  let new_input_date = new Date(birthDate);
  let today_date = new Date();
  let amount_time = today_date.getTime() - new_input_date.getTime();
  let count_date = amount_time/(1000*3600*24);

  if (count_date < 0){
    p_tag.innerHTML = "Nhập lại ngày sinh!";
    birthdayInput.style.border = "2px solid red";
    endBtn.disabled = true;
    document.getElementById('cmndNumber').disabled = true;
    document.getElementById('ngay_cap_cmnd').disabled = true;
    document.getElementById('noi_cap_cmnd').disabled = true;
    document.getElementById('cmndNumber').required = false;
    document.getElementById('ngay_cap_cmnd').required = false;
    document.getElementById('noi_cap_cmnd').required = false;
  }else if(count_date <= 30) {
    career.value = 'Mới sinh';
    p_tag.innerHTML = "";
    birthdayInput.style.border = "";
    endBtn.disabled = false;
    document.getElementById('cmndNumber').disabled = true;
    document.getElementById('ngay_cap_cmnd').disabled = true;
    document.getElementById('noi_cap_cmnd').disabled = true;
    document.getElementById('cmndNumber').required = false;
    document.getElementById('ngay_cap_cmnd').required = false;
    document.getElementById('noi_cap_cmnd').required = false;
  }
  else if (count_date < 5110) {
    career.value = '';
    p_tag.innerHTML = "";
    birthdayInput.style.border = "";
    endBtn.disabled = false;
    document.getElementById('cmndNumber').disabled = true;
    document.getElementById('ngay_cap_cmnd').disabled = true;
    document.getElementById('noi_cap_cmnd').disabled = true;
    document.getElementById('cmndNumber').required = false;
    document.getElementById('ngay_cap_cmnd').required = false;
    document.getElementById('noi_cap_cmnd').required = false;
  }
  else{
    career.value = '';
    p_tag.innerHTML = "";
    birthdayInput.style.border = "";
    endBtn.disabled = false;
    document.getElementById('cmndNumber').disabled = false;
    document.getElementById('ngay_cap_cmnd').disabled = false;
    document.getElementById('noi_cap_cmnd').disabled = false;
    document.getElementById('cmndNumber').required = true;
    document.getElementById('ngay_cap_cmnd').required = true;
    document.getElementById('noi_cap_cmnd').required = true;
  }
  
  if(count_date < 6570 && isChuho.checked == true) {
    alert('Chủ hộ phải đủ 18 tuổi trở lên!');
    endBtn.disabled = true;
  }

  let role = relation.value;
  let resFamilies = await axios.get("http://localhost:3001/familyList/getAllFamily");
  let resUsers = await axios.get('http://localhost:3001/nhankhau/getAllUser');
  let families = resFamilies.data;
  let users = resUsers.data;

  families.forEach(family => {
    if(family.ma_ho_khau === (+element.value)) {
      users.forEach( user => {
        if( user.ma_nhan_khau === family.ma_chu_ho) {
          let d1 = new Date(birthDate); //ngày sinh mới nhập
          let d2 = new Date(user.birthday); // ngày sinh của chủ hộ
          let time = d1.getTime() - d2.getTime();
          let countTime = time/(1000*3600*24*365);
          switch(role) {
            case "Ông": 
              if(countTime <= -50) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Bà":
              if(countTime <= -50) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Bố": 
              if(countTime >= -49 && countTime <= -18) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Mẹ": 
              if(countTime >= -49 && countTime <= -18) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Vợ": 
              if(countTime >= -18 && countTime <= 18) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Chồng": 
              if(countTime >= -18 && countTime <= 18) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break; 
            case "Anh": 
              if(countTime <= 0 && countTime >= -30) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Chị": 
              if(countTime <= 0 && countTime >= -30) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Em": 
              if(countTime >= 0 && countTime <= 30) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
            case "Con" :
              if(countTime < 18 || countTime > 60) {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              else {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              break;
            case "Cháu": 
              if(countTime >= 50) {
                p_tag.innerHTML = "";
                birthdayInput.style.border = "1px solid #666";
                endBtn.disabled = false;
              }
              else {
                p_tag.innerHTML = "Nhập lại ngày sinh!";
                birthdayInput.style.border = "2px solid red";
                endBtn.disabled = true;
              }
              break;
          }
        }
      })
    }
  })
}
function checkNumberAddress(get) {
  let endBtn = document.getElementById('submit-btn-end');
  let value = get.value;
  if(value <= 0 || value >= 1000) {
    endBtn.disabled = true;
    get.style.border = "2px solid red";
  }
  else {
    endBtn.disabled = false;
    get.style.border = "1px solid #666";
  }
} 
function checkValidCmnd(get) {
  let endBtn = document.getElementById('submit-btn-end');
  let value = get.value;
  if(typeof +value == 'number') {
    if(value.length !== 12) {
      endBtn.disabled = true;
      get.style.border = "2px solid red";
    }
    else {
      get.value = value;
      endBtn.disabled = false;
      get.style.border = "1px solid #666";
    }
  }
  if(value == '') {
    endBtn.disabled = false;
    get.style.border = "1px solid #666";
  }
}

async function checkDateCMND(get) {
  let endBtn = document.getElementById('submit-btn-end');
  let date = document.getElementById('birthday').value;
  let dateValue = get.value;
  //
  let d1 = new Date(dateValue); //ngày sinh mới nhập
  let d2 = new Date(date); // ngày sinh của chủ hộ
  let d3 = new Date();
  let breakCurrentTime = d1.getTime() - d3.getTime(); //so sanh voi thoi gian hien tai
  let time = d1.getTime() - d2.getTime();
  let countTime = time/(1000*3600*24*365);
  if(countTime < 14 || breakCurrentTime >= 0 ) {
    endBtn.disabled = true;
    get.style.border = "2px solid red";
  }
  else {
    endBtn.disabled = false;
    get.style.border = "1px solid #666";
  }
}
function checkValidDateLive(get) {
  let endBtn = document.getElementById('submit-btn-end');
  let date = document.getElementById('birthday').value;
  let dateValue = get.value;
  //
  let d1 = new Date(dateValue); //ngày sinh mới nhập
  let d2 = new Date(date); // ngày sinh của chủ hộ
  let d3 = new Date();
  let breakCurrentTime = d1.getTime() - d3.getTime(); //so sanh voi thoi gian hien tai
  let time = d1.getTime() - d2.getTime();
  let countTime = time/(1000*3600*24*365);
  if(countTime < 0 || breakCurrentTime >= 0) {
    endBtn.disabled = true;
    get.style.border = "2px solid red";
  }
  else {
    endBtn.disabled = false;
    get.style.border = "1px solid #666";
  }
}

function checkValidFamily(get) {
  let p_tag = get.parentNode.parentNode.getElementsByTagName('p')[0];
  let endBtn = document.getElementById('submit-btn-end');
  let value = get.value;
  if ( value !== "") {
    if(value < 10000000 || value > 99999999) {
      endBtn.disabled = true;
      get.style.border = "2px solid red";
      p_tag.innerHTML = "Mã hộ khẩu là số có giá trị trong khoảng 10000000 - 99999999";
    }
    else {
      endBtn.disabled = false;
      get.style.border = "1px solid #666";
      p_tag.innerHTML = "";
    }
  }
}

function exit(event, get) {
  if(event.target === event.currentTarget) {
    get.style.display = 'none';
  }
  else {
    return;
  }
}

async function createFamily() {
  document.getElementsByClassName('wrap-form-create')[0].style.display = 'block';
  let Users = document.querySelectorAll(
    '[name="selectAllUser[]"]:checked'
  )
  let allUsers = await axios.get('http://localhost:3001/nhankhau/getAllUser');
  let arr = [];
  Users.forEach( user => {
    allUsers.data.forEach( data => {
      if( data.ma_nhan_khau == user.value) {
        arr.push(data);
      }
    })
  })
  let element = document.getElementsByClassName('form-select-chuho')[0];
  let newElement = arr.map( item => {
    return `<option value="${item.ma_nhan_khau}" name='user_name' id="user_${item.ma_nhan_khau}">${item.ten_nhan_khau}</option>`
  })
  newElement.forEach( item => {
    let data = new DOMParser().parseFromString(item, 'text/html');
    element.append(data.body.firstChild);
  });

  let id_chuho = document.getElementById('chuho').value;
  let select = document.getElementsByClassName('form-select-chuho')[0];
  for(let i = 0; i <= select.length - 1; i++) {
    if(select.options[i].value !== id_chuho) {
      let newElement = `<div class="select-member-content">
      <div class="select-member-main_content">
        <div class="select-member-name">
          <label for="">Tên</label>
          <input type="text" value="${select.options[i].innerHTML}" id="id_${select.options[i].value}">
        </div>
        <div class="select-member-relation">
            <label for="member_${select.options[i].value}"">Quan hệ với chủ hộ</label>
            <select name="members[]" id="member_${select.options[i].value}" onchange="checkTimeRules(this)">
                <option value="Ông_${select.options[i].value}">Ông</option>
                <option value="Bà_${select.options[i].value}">Bà</option>
                <option value="Bố_${select.options[i].value}">Bố</option>
                <option value="Mẹ_${select.options[i].value}">Mẹ</option>
                <option value="Vợ_${select.options[i].value}">Vợ</option>
                <option value="Chồng_${select.options[i].value}">Chồng</option>
                <option value="Anh_${select.options[i].value}">Anh</option>
                <option value="Chị_${select.options[i].value}">Chị</option>
                <option value="Em_${select.options[i].value}">Em</option>
                <option value="Con_${select.options[i].value}">Con</option>
                <option value="Cháu_${select.options[i].value}">Cháu</option>
            </select>
        </div>
      </div>
      <p style="color: red; text-align: right; font-size: 12px; height: 15px"></p>
    </div>`
    let parentElement = document.getElementsByClassName('select-member')[0];
    let data = new DOMParser().parseFromString(newElement, 'text/html');
    parentElement.append(data.body.firstChild);
    }
  }
}

function selectChuho(get) {
  let endBtn = document.getElementById('select-member-submit');
  endBtn.disabled = false;
  //
  let elements = document.getElementsByClassName('select-member')[0];
  elements.innerHTML = '';
  let idChuho = get.value;
  let select = document.getElementsByClassName('form-select-chuho')[0];
  for(let i = 0; i <= select.length - 1; i++) {
    if(select.options[i].value !== idChuho) {
      let newElement = `<div class="select-member-content">
      <div class="select-member-main_content">
        <div class="select-member-name">
          <label for="">Tên</label>
          <input type="text" value="${select.options[i].innerHTML}" id="id_${select.options[i].value}">
        </div>
        <div class="select-member-relation">
            <label for="member_${select.options[i].value}"">Quan hệ với chủ hộ</label>
            <select name="members[]" id="member_${select.options[i].value}" onchange="checkTimeRules(this)">
                <option value="Ông_${select.options[i].value}">Ông</option>
                <option value="Bà_${select.options[i].value}">Bà</option>
                <option value="Bố_${select.options[i].value}">Bố</option>
                <option value="Mẹ_${select.options[i].value}">Mẹ</option>
                <option value="Vợ_${select.options[i].value}">Vợ</option>
                <option value="Chồng_${select.options[i].value}">Chồng</option>
                <option value="Anh_${select.options[i].value}">Anh</option>
                <option value="Chị_${select.options[i].value}">Chị</option>
                <option value="Em_${select.options[i].value}">Em</option>
                <option value="Con_${select.options[i].value}">Con</option>
                <option value="Cháu_${select.options[i].value}">Cháu</option>
            </select>
        </div>
      </div>
      <p style="color: red; text-align: right; font-size: 12px; height: 15px"></p>
    </div>`
    let parentElement = document.getElementsByClassName('select-member')[0];
    let data = new DOMParser().parseFromString(newElement, 'text/html');
    parentElement.append(data.body.firstChild);
    }
  }
}

function removeOptionTags() {
  let select = document.getElementsByClassName('form-select-chuho')[0];
  select.innerHTML = '';
  let elements = document.getElementsByClassName('select-member')[0];
  elements.innerHTML = '';
  document.getElementsByClassName('wrap-form-create')[0].style.display = 'none';
}

function checkValidBirthday(get) {
  let string_id = get.parentNode.parentNode.getElementsByClassName('select-member-name')[0].getElementsByTagName('input')[0].id;
  let id_thanhvien = +string_id.split('id_')[1];
  console.log(typeof id_thanhvien);

  let ele = document.getElementsByClassName('form-select-chuho')[0];
  let id_chuho = +ele.value;
  console.log(id_chuho);
}

function checkValidIdFamily(get) {
  let p_tag = get.parentNode.getElementsByTagName('p')[0];
  let endBtn = document.getElementById('select-member-submit');
  let value = get.value;
  if (value == "") {
      endBtn.disabled = true;
      get.style.border = "1px solid #666";
      p_tag.innerHTML = "";
  } 
  axios.get("http://localhost:3001/familyList/getAllFamily").then(
      res => {
          let families = res.data;
          let arr = [];
          for(let family of families) {
              arr.push(family.ma_ho_khau);
          }
          if(get.value !== "" && value.length === 8) {
            endBtn.disabled = false;
          }
          else {
            endBtn.disabled = true;
            p_tag.innerHTML = "Mã hộ khẩu không hợp lệ!";
          }

          if(arr.includes(+get.value)) {
            endBtn.disabled = true;
            p_tag.innerHTML = "Mã hộ khẩu đã tồn tại!";
          }
          else {
            endBtn.disabled = false;
            p_tag.innerHTML = "";
          }
      }
  )
}

function checkValid_MaNhanKhau(get) {
  let p_tag = get.parentNode.getElementsByTagName('p')[0];
  if(get.value !== "") {
    if (get.value < 10000000 || get.value > 99999999) {
      p_tag.innerHTML = "Mã nhân khẩu không hợp lệ!";
      document.getElementById('select-member-submit').disabled = true;
    }
    else {
      document.getElementById('select-member-submit').disabled = false;
    }
  }
  else {
    document.getElementById('select-member-submit').disabled = false;
  }
  
}

let form_add = document.getElementsByClassName("form-add")[0];
if (form_add) {
  console.log(form_add);
}
function checkFamily(get) {
  let p_tag = get.parentNode.parentNode.getElementsByTagName("p")[0];
  let endBtn = document.getElementById("submit-btn-end");
  let value = get.value;
  if (value === "") {
    endBtn.disabled = false;
    get.style.border = "1px solid #666";
    p_tag.innerHTML = "";
  }
  axios.get("http://localhost:3001/familyList/getAllFamily").then((res) => {
    let families = res.data;
    let arr = [];
    for (let family of families) {
      arr.push(family.ma_ho_khau);
    }
    if (get.value !== "" && value.length === 8) {
      document.getElementById("role").checked = true;
      document.getElementsByClassName("isChuho")[0].style.display = "block";
      document.getElementById('ten_quan').required = true;
      document.getElementById('ten_phuong').required = true;
      document.getElementById('ten_duong').required = true;
      document.getElementById('so_nha').required = true;  
    } else {
      document.getElementById("role").checked = false;
      document.getElementsByClassName("isChuho")[0].style.display = "none ";
      document.getElementById('ten_quan').required = false;
      document.getElementById('ten_phuong').required = false;
      document.getElementById('ten_duong').required = false;
      document.getElementById('so_nha').required = false;
    }

    if (arr.includes(+get.value)) {
      document.getElementById("role").checked = false;
      document.getElementById("role").disabled = true;
      document.getElementById("relation").disabled = false;
      document.getElementsByClassName("isChuho")[0].style.display = "none ";
      document.getElementById('ten_quan').required = false;
      document.getElementById('ten_phuong').required = false;
      document.getElementById('ten_duong').required = false;
      document.getElementById('so_nha').required = false;
    } else {
      document.getElementById("relation").disabled = true;
      document.getElementById("role").disabled = false;
    }
  });
}

function checkUser(get) {
  let p_tag = get.parentNode.parentNode.getElementsByTagName("p")[0];
  axios.get("http://localhost:3001/nhankhau/getAllUser").then((res) => {
    let btn_submit = document.getElementById("submit-btn-end");
    let input_manhankhau = document.getElementById("ma_nhan_khau");
    let users = res.data;
    let arr = [];
    for (let user of users) {
      arr.push(user.ma_nhan_khau);
    }
    if (arr.includes(+get.value)) {
      for (let person of users) {
        if (person.ma_ho_khau && person.ma_nhan_khau === +get.value) {
          btn_submit.disabled = true;
          input_manhankhau.style.border = "2px solid red";
          input_manhankhau.style.borderRadius = "2px";
          p_tag.innerHTML = "Mã nhân khẩu này đã có hộ khẩu!";
        } else if (
          person.ma_ho_khau == null &&
          person.ma_nhan_khau === +get.value
        ) {
          btn_submit.disabled = false;
          input_manhankhau.style.border = "1px solid black";
          p_tag.innerHTML = "";
        }
      }
    } else {
      btn_submit.disabled = false;
      input_manhankhau.style.border = "1px solid black";
      p_tag.innerHTML = "";
    }
  });
}

function checkCMND(get) {
  let p_tag = get.parentNode.parentNode.getElementsByTagName("p")[0];
  axios.get("http://localhost:3001/nhankhau/getAllUser").then((res) => {
    let btn_submit = document.getElementById("submit-btn-end");
    let cmndNumber = document.getElementById("cmndNumber");
    let users = res.data;
    let arr = [];
    for (let user of users) {
      arr.push(user.cmndNumber);
    }
    if (arr.includes(+get.value)) {
      btn_submit.disabled = true;
      cmndNumber.style.border = "2px solid red";
      p_tag.innerHTML = "Số CMND này đã tồn tại!";
    } else {
      btn_submit.disabled = false;
      cmndNumber.style.border = "1px solid black";
      p_tag.innerHTML = "";
    }
  });
}

window.onload = async () => {
  let results = await axios.get(
    "http://localhost:3001/nhankhau/getAllUser"
  );
  let users = results.data;
  users.forEach((user) => {
    if (user.role === "on") {
      document.getElementById(user.ma_nhan_khau).disabled = true;
    }
  });
};

