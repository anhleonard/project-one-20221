function sidebar_open() {
    document.getElementById("mySidebar").style.width = "15%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = "none";
}
function sidebar_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

function mamnon() {
    document.getElementById("mn").style.display = "block";
    document.getElementById("mg").style.display = "none";
    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "none";
    document.getElementById("work").style.display = "none";
    document.getElementById("retire").style.display = "none";
}

function maugiao() {
    document.getElementById("mn").style.display = "none";
    document.getElementById("mg").style.display = "block";
    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "none";
    document.getElementById("work").style.display = "none";
    document.getElementById("retire").style.display = "none";
}

function capmot() {
    document.getElementById("mn").style.display = "none";
    document.getElementById("mg").style.display = "none";
    document.getElementById("c1").style.display = "block";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "none";
    document.getElementById("work").style.display = "none";
    document.getElementById("retire").style.display = "none";
}

function caphai() {
    document.getElementById("mn").style.display = "none";
    document.getElementById("mg").style.display = "none";
    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "block";
    document.getElementById("c3").style.display = "none";
    document.getElementById("work").style.display = "none";
    document.getElementById("retire").style.display = "none";
}

function capba() {
    document.getElementById("mn").style.display = "none";
    document.getElementById("mg").style.display = "none";
    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "block";
    document.getElementById("work").style.display = "none";
    document.getElementById("retire").style.display = "none";
}

function work() {
    document.getElementById("mn").style.display = "none";
    document.getElementById("mg").style.display = "none";
    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "none";
    document.getElementById("work").style.display = "block";
    document.getElementById("retire").style.display = "none";
}

function retire() {
    document.getElementById("mn").style.display = "none";
    document.getElementById("mg").style.display = "none";
    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "none";
    document.getElementById("work").style.display = "none";
    document.getElementById("retire").style.display = "block";
}

function data_tru() {
    document.getElementById("datas_tru").style.display = "block";
    document.getElementById("datas_vang").style.display = "none";
}

function data_vang() {
    document.getElementById("datas_tru").style.display = "none";
    document.getElementById("datas_vang").style.display = "block";
}

function ismale() {
    document.getElementById("male").style.display = "block";
    document.getElementById("female").style.display = "none";
}

function isfemale() {
    document.getElementById("male").style.display = "none";
    document.getElementById("female").style.display = "block";
}