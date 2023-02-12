function checkedRequire(get) {
    let isRequire = get.checked;
    let moneyInput = document.getElementById('money');
    if(isRequire) {
        moneyInput.disabled = false;
    }
    else {
        moneyInput.disabled = true;
    }
}
window.onload = () => {
    let requireInput = document.getElementById('require');
    let isRequire = requireInput.checked;
    let moneyInput = document.getElementById('money');
    if(isRequire) {
        moneyInput.disabled = false;
    }
    else {
        moneyInput.disabled = true;
    }
}

function tonggleFormAddActivity() {
    let formAdd = document.getElementsByClassName('wrap-add-activity-form')[0];
    formAdd.classList.toggle('reNone');
}