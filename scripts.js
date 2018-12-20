"use strict";
function getListElement(){
    return document.getElementById("stock_list");
}

function addStock() {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    
    const ul = getListElement();
    ul.appendChild(clon);

    fillDayData();
}

function deleteStock(deleteBtn) {
    let day = deleteBtn.getAttribute("day");
    const ul = getListElement();
    ul.removeChild(ul.children[day - 1]);
    
    fillDayData();
}

function fillDayData() {
    const ul = getListElement();
    for (let day = 1; day <= ul.childElementCount; ++day) {
        const li = ul.children[day - 1];
        const dayLabel = li.getElementsByClassName("DayLabel")[0];
        dayLabel.innerText = `Day ${day}:`;

        const deleteBtn = li.getElementsByClassName("DeleteButton")[0];
        deleteBtn.setAttribute("day", day);
    }
}