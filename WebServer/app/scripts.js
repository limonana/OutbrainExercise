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

function getDecision(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const decision= JSON.parse(this.responseText);
          displayDecision(decision);        
      }
    };
    xhttp.open("POST", "api/Decision", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({StockValues: getStockValues()}));
}

function displayDecision(decision){
    document.getElementById("sellingDay").innerText = decision.sellingDay;
    document.getElementById("buyingDay").innerText = decision.buyingDay;
    document.getElementById("revenue").innerText = decision.revenue;    
}

function getStockValues(){
    const ul = getListElement();
    const inputs = Array.from(ul.getElementsByTagName("input"));
    return inputs.map(element => element.valueAsNumber);
}
