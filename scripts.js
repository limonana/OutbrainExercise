"use strict";
function addStock() {
    const ul = document.getElementById("stock_list");   
    var li = document.createElement("li");
    
    const dayLbl = document.createElement("label");
    let day = ul.children.length+1;   
    dayLbl.innerText=`Day ${day}:`;
    li.appendChild(dayLbl);
    
    const input = document.createElement("input");
    li.appendChild(input);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText="Delete";
    li.appendChild(deleteBtn);
                  
    ul.appendChild(li);               
  }