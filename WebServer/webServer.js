const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname,"fe_app")));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,"fe_app","index.html"));
});

// configure app to use bodyParser()
// this will let us get the data from a POST
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/Decision', function(req, res) {
    const stockValues = req.body.StockValues;
    let decision = findBestDecision(stockValues);    
    res.json(decision);   
});


const port = 8080; //can't use 80 because of previliges issue
app.listen(port);
console.log('Webserver Listen on port ' + port);

function findBestDecision(stockValues){
    let maxRevenueDecision = {operation: 'Do Nothing', revenue:0 }
    for ( let buyingDay =1 ; buyingDay <= stockValues.length; ++buyingDay){
        for ( let sellingDay = buyingDay+1; sellingDay <= stockValues.length; ++sellingDay){
            let revenue = stockValues[sellingDay-1] - stockValues[buyingDay-1];
            if (revenue > maxRevenueDecision.revenue){
                maxRevenueDecision = {operation:'Buy And Sell',buyingDay: buyingDay, sellingDay: sellingDay, revenue: revenue};
            }
        }
    }
    return maxRevenueDecision;
}