"use strict";
function addStock() {
    const ul = document.getElementById("stock_list");
    var li = document.createElement("li");

    const dayLbl = document.createElement("label");
    dayLbl.setAttribute("class", "DayLabel");
    li.appendChild(dayLbl);

    const input = document.createElement("input");
    li.appendChild(input);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.onclick = deleteStock;
    deleteBtn.setAttribute("class", "DeleteButton");
    li.appendChild(deleteBtn);

    ul.appendChild(li);

    fillDayData();
}

function deleteStock(e) {
    const deleteBtn = e.target;
    let day = deleteBtn.getAttribute("day");
    const ul = document.getElementById("stock_list");
    ul.removeChild(ul.children[day - 1]);
    fillDayData();
}

function fillDayData() {
    const ul = document.getElementById("stock_list");
    for (let day = 1; day <= ul.childElementCount; ++day) {
        const li = ul.children[day - 1];
        const dayLabel = li.getElementsByClassName("DayLabel")[0];
        dayLabel.innerText = `Day ${day}:`;

        const deleteBtn = li.getElementsByClassName("DeleteButton")[0];
        deleteBtn.setAttribute("day", day);
    }
}