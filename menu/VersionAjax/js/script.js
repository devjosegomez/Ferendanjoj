//Global variables
var colors = ["#BB2225", "#EF3832", "#F09560", "#F6961D", "#E7C623", "#DFD983", "#DFD983", "#DFD983", "#9FCC3B", "#069A9A", "#00A7E5", "#F6ACC5", "#B54C85", "#C2C1D1", "#61C8DB"];
var today = new Date();
var getJson = new XMLHttpRequest();
var PUTJson = new XMLHttpRequest();
var PUTJson2 = new XMLHttpRequest();
var newJson = new XMLHttpRequest();
var JsonDB = "";

//Get content
if (nChilds() == "0") {
    document.getElementById("Default").removeAttribute("hidden");
}

//load content
function loadAllTabs() {
    var container = document.getElementById("mainContainer");
    container.innerHTML = "";
    var numTabs = getJsonLenght();
    if (numTabs => "1") {
        for (i = 0; i < parseInt(numTabs); i++) {
            addTab(i);
        }
    }
}

//get Lenght
function getJsonLenght() {
    return JsonDB["db"].length;
}

/*-----------------------------*/
//---Create and load new data!---
/*-----------------------------*/
function addCard(_id) {
    window.scrollTo(0, document.body.scrollHeight);
    var container = document.getElementById("mainContainer");
    container.innerHTML = "";
    createJson(_id);
    loadAllTabs();
    document.location.reload();
    window.scrollTo(0, document.body.scrollHeight);
}


/*--------------------------------------- */
/* ----- create default + id Json-------- */
/*--------------------------------------- */

function createJson(_id) {
    var weekDay = today.getDay();
    xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/db/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify({
        "id": _id,
        "content": "#" + _id,
        "weekDayTag": weekDay,
        "createdOn": createdOn(),
        "color": 9,
        "isDeleted": 0,
        "visibility": 0,
        "lastUpdate": "08-01-2019 20:08"
    });
    xhr.send(data);
}

// DeleteJson
function DeleteJson(_id) {
    newJson.open('DELETE', 'http://localhost:3000/db/' + _id, false);
    newJson.send();
    document.location.reload();
    window.scrollTo(0, document.body.scrollHeight);

}

//update json
function UpdateJson(id){
    var TAcontent = document.getElementById("ta-"+id);
    var weekDay = today.getDay();
    PUTJson.open("PUT", 'http://localhost:3000/db/' + id, false);
    PUTJson.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify({
        "id": id,
        "content": TAcontent.value,
        "weekDayTag": weekDay,
        "createdOn": JsonDB["db"][id].createdOn,
        "color": 9,
        "isDeleted": 0,
        "visibility": 0,
        "lastUpdate": createdOn()
    });
    PUTJson.send(data);
    document.location.reload();
}

/*--------------------------------------- */
/* -------- get each propertie   -------- */
/*--------------------------------------- */

//--------------------------------- getColor
function getColor(id) {
    var colorId = JsonDB["db"][id].color;
    return colors[parseInt(colorId)];
}

//--------------------------------- getContent
function getContent(id) {
    var content = JsonDB["db"][id].content;
    return content;
}

//--------------------------------- getIdTab
function getIdTab(_id) {
    var idTab = JsonDB["db"][_id].id;
    return idTab;
}



//Get onload
window.addEventListener('load', function () {
    getJson.open('GET', 'http://localhost:3000/db/', false);
    getJson.onreadystatechange = function () {
        if (getJson.readyState == XMLHttpRequest.DONE) {
            JsonDB = JSON.parse(getJson.responseText);
        }
    }
    getJson.send();
    loadAllTabs();
})

//Create tabs
function addTab(_id) {
    //var tabColor = randomColor();
    var idTab = getIdTab(_id);
    var content = getContent(idTab);
    var weekDay = today.getDay();
    var tabColor = getColor(idTab);
    var pinColor = randomColor();
    
    var divBoxTab = "<div class=\"box-tab hvr-curl-top-right\" id=\"tab-" + idTab + "\" style=\"background-color:" + tabColor + "\"><i class=\"fas fa-thumbtack fa-2x \" style=\"color:" + pinColor + "\"></i><button title=\"Delete\" class='hvr-back-pulse box-Delete' onclick=\"DeleteJson(" + idTab + ");\"><i class=\"fas fa-trash\"></i></button><button title=\"Pick a random color\" class='hvr-back-pulse box-Delete' onclick=\"EditColor(" + idTab + ");\"><i class=\"fas fa-palette\"></i></button><button title=\"Save changes!\" class='hvr-back-pulse box-Delete' onclick=\"UpdateJson(" + idTab + ");\"><i class=\"fas fa-save fa-2x\"></i></button><hr><textarea id=\"ta-"+idTab+"\" maxlength=\"400\">" + content + "</textarea></div>";
    
    var container = document.getElementById("mainContainer");
    container.innerHTML += divBoxTab;
    if (nChilds() >= "1") {
        var defa = document.getElementById("Default");
        defa.setAttribute("hidden", "true");
    }
}

//edit color
function EditColor(id){
    var TAcontent = document.getElementById("ta-"+id);
    var weekDay = today.getDay();
    PUTJson2.open("PUT", 'http://localhost:3000/db/' + id, false);
    PUTJson2.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify({
        "id": id,
        "content": TAcontent.value,
        "weekDayTag": JsonDB["db"][id].weekDayTag,
        "createdOn": JsonDB["db"][id].createdOn,
        "color": (Math.floor(Math.random() * 9) + 1),
        "isDeleted": 0,
        "visibility": 0,
        "lastUpdate": createdOn()
    });
    PUTJson2.send(data);
    document.location.reload();
}

/*--------------------------------------- */
/* -------- get each propertie   -------- */
/*--------------------------------------- */

//--------------------------------- getColor
function getColor(id) {
    var colorId = JsonDB["db"][id].color;
    return colors[parseInt(colorId)];
}

function randomColor() {
    var i = Math.floor((Math.random() * colors.length) + 1);

    if (typeof colors[i] === 'undefined') {
        return '#E8C124';
    } else {
        return colors[i];
    }
}

function nChilds() {
    return document.getElementById("mainContainer").childNodes.length;
}

function createdOn() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    var HH = today.getHours();  
    var MM = today.getMinutes();  
    var SS = today.getSeconds();  

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return (mm + '/' + dd + '/' + yyyy + " (" +HH+"h:"+MM+"m:"+SS+"s)");
}

function goHome(){
    document.location.href="/#slide01";
}
