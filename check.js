let date = new Date();
let date_die;
if(date.getMonth() == 0 || date.getMonth() == 10) {
    let month = date.getMonth() + 1;
    date_die = date.getFullYear() + '-' + month + '-' + date.getDate();
}
else {
    date_die = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
}

