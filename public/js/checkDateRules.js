async function changeUserRelation(get) {
    let endBtn = document.getElementsByClassName('change-btn')[0];
    let p_tag = get.parentNode.parentNode.parentNode.getElementsByTagName('p')[0];
    console.log(p_tag);

    let role = get.value.split('-')[1];
    //
    let id_new_chuho = document.getElementById('new_chu_ho').value;
    let allUsers = await axios.get('http://localhost:3001/nhankhau/getAllUser');

    let d1,d2;

    let users = allUsers.data;
    for(let user of users) {
        if(user.ma_nhan_khau === +id_new_chuho) {
            d2 = new Date(user.birthday);
        }
    }

    let wrapNode = get.parentNode.parentNode;
    let idThisNode = wrapNode.getElementsByClassName('listMembers')[0];
    let id_member = +idThisNode.id.split('id_')[1];
    for(let user of users) {
        if(user.ma_nhan_khau === +id_member) {
            d1 = new Date(user.birthday);
        }
    }
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