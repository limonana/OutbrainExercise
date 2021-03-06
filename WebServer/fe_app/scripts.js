"use strict";
function pageLoad(){
    window.addEventListener('error', (event) => alert("some error occured") );
    defineFormSubmit();
    
    hide(getDecisionArea());
    addStock();   
}
function defineFormSubmit() {
    var form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        getDecision();
    });
}

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
    let decisionURL = "Decision?StockValues="+JSON.stringify(getStockValues());
    fetch(decisionURL)
    .then((resp) => resp.json()).then((data)=>displayDecision(data))
    .catch(() => alert("Opps. Something went wrong"));
}

function displayDecision(decision){    
    show(getDecisionArea());
    document.getElementById("operation").innerText = decision.operation;
    if (decision.operation==='Buy And Sell'){
        show(document.getElementById("buyAndSellArea"));
        document.getElementById("sellingDay").innerText = decision.sellingDay;
        document.getElementById("buyingDay").innerText = decision.buyingDay;
        document.getElementById("revenue").innerText = decision.revenue;
    }    
    else{
        hide(document.getElementById("buyAndSellArea"));
    }
}

function getDecisionArea() {
    return document.getElementById("decisionArea");
}

function showDecisionArea() {
    const decisionAreaElem = 
    show(decisionAreaElem);
}

function show(elem) {
    elem.style.display = "block";
}

function hide(elem) {
    elem.style.display = "none";
}

function getStockValues(){
    const ul = getListElement();
    const inputs = Array.from(ul.getElementsByTagName("input"));
    return inputs.map(element => element.valueAsNumber);
}
