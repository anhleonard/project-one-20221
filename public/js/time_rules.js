
async function checkTimeRules(get) {
    //get role
    let string_id = get.value.replace(/[^0-9]/g, '');
    let newStringId = '_' + string_id;
    let role = get.value.split(newStringId)[0];
    console.log(role);
    //get id member
    let parentElement = get.parentNode.parentNode;
    let input = parentElement.getElementsByClassName('select-member-name')[0].getElementsByTagName('input')[0];
    let id_user = +input.id.split('id_')[1];
    //get id chuho
    let selectChuho = document.getElementsByClassName('form-select-chuho')[0];
    let id_chuho = +selectChuho.value;
    //
    let p_tag = get.parentNode.parentNode.parentNode.getElementsByTagName('p')[0];
    let endBtn = document.getElementById('select-member-submit');

    let allUsers = await axios.get('http://localhost:3001/nhankhau/getAllUser');
    let d1, d2;
    allUsers.data.forEach(user => {
        if(user.ma_nhan_khau === id_user) {
            d1 = new Date(user.birthday); //ngày sinh member
        }
        else if(user.ma_nhan_khau === id_chuho) {
            d2 = new Date(user.birthday); // ngày sinh của chủ hộ
        }
    })
    let time = d1.getTime() - d2.getTime();
    let countTime = time/(1000*3600*24*365);
    switch(role) {
      case "Ông": 
        if(countTime <= -50) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Bà":
        if(countTime <= -50) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Bố": 
        if(countTime >= -49 && countTime <= -18) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Mẹ": 
        if(countTime >= -49 && countTime <= -18) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Vợ": 
        if(countTime >= -18 && countTime <= 18) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Chồng": 
        if(countTime >= -18 && countTime <= 18) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break; 
      case "Anh": 
        if(countTime <= 0 && countTime >= -30) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Chị": 
        if(countTime <= 0 && countTime >= -30) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Em": 
        if(countTime >= 0 && countTime <= 30) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
      case "Con" :
        if(countTime < 18 || countTime > 60) {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        else {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        break;
      case "Cháu": 
        if(countTime >= 50) {
          p_tag.innerHTML = "";
          endBtn.disabled = false;
        }
        else {
          p_tag.innerHTML = "Vui lòng chọn lại quan hệ!";
          endBtn.disabled = true;
        }
        break;
    }
}
