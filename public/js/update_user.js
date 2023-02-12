async function check(get) {
    let resUsers = await axios.get('http://localhost:3001/nhankhau/getAllUser');
    let users = resUsers.data;
    users.forEach( user => {
        if(user.ma_nhan_khau === 121101) {
            console.log(typeof user.ma_nhan_khau);
        }
    })
}

