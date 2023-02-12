window.onload = async () => {
    let new_chu_ho = document.getElementById('new_chu_ho');
    let id_chuho = +new_chu_ho.value;
    let string_id_chuho = 'id_' + id_chuho;
    
    let input_chuho = document.getElementById(string_id_chuho);
    input_chuho.disabled = true;
    let parentInputNode = input_chuho.parentNode.parentNode;
    let relationInput = parentInputNode.getElementsByClassName('select-relation')[0].getElementsByTagName('select')[0];
    relationInput.disabled = true;
}
async function updateSetRelation(get) {
    let unDisabled = document.getElementsByClassName('unDisabled');
    for(let element of unDisabled) {
        element.disabled = false;
    }
    let arrMembers = document.getElementsByClassName('listMembers');
    for(let element of arrMembers) {
        element.disabled = false;
    }

    let id_chuho = +get.value;
    let string_id_chuho = 'id_' + id_chuho;
    
    let input_chuho = document.getElementById(string_id_chuho);
    input_chuho.disabled = true;
    let parentInputNode = input_chuho.parentNode.parentNode;
    let relationInput = parentInputNode.getElementsByClassName('select-relation')[0].getElementsByTagName('select')[0];
    relationInput.disabled = true;

}

function deleteSure(get) {
    let element = get.parentNode.parentNode;
    let ele = element.getElementsByClassName('form-delete-sure')[0];
    ele.style.display = 'block';
}
function deletePeople(get) {
    let id = get.id;
    let form = get.form;
    form.action = '/familyList/detail_family/delete/' + id + '?_method=DELETE';
}
function cancelDelete(get) {
    let element = get.parentNode.parentNode;
    let ele = element.getElementsByClassName('form-delete-sure')[0];
    ele.style.display = 'none';
}
function isChecked(get) {
    let body = get.parentNode.parentNode;
    let  newBody = body.getElementsByClassName('option');
    let arr = [];
    for(let value of newBody) {
        let val = value.querySelector('[name=status]');
        arr.push(val);
    }
    if(arr[0].checked) {
        arr[1].checked = false;
        arr[2].checked = false;
    }
    else if (arr[1].checked){
        arr[0].checked = false;
        arr[2].checked = false;
    } else if (arr[2].checked) {
        arr[0].checked = false;
        arr[1].checked = false;
    }
    if(arr[1].checked) {
        let element = arr[1].parentNode;
        let ele = element.getElementsByClassName('form-moved')[0];
        ele.style.display = 'block';
        let items = ele.getElementsByClassName('form-moved-input');
        for(let item of items) {
            item.disabled = false;
        }
    }
    else {
        let element = arr[1].parentNode;
        let ele = element.getElementsByClassName('form-moved')[0];
        ele.style.display = 'none';
        let items = ele.getElementsByClassName('form-moved-input');
        for(let item of items) {
            item.disabled = true;
        }
    }
}
function showStatus(get) {
    let element = get.parentNode;
    let ele = element.getElementsByClassName('form-status')[0];
    ele.style.display = 'block';
}
function changeStatus(get) {
    let element = get.parentNode;
    element.action = '/familyList/detail_family/changeStatus/' + element.id + '?_method=PUT';
}
function changeRole(get) {
    let element = get.parentNode;
    let id_family = element.id.match(/\d+/g)[0];
    element.action = '/familyList/detail_family/changeRole/' + id_family + '?_method=PUT';
}