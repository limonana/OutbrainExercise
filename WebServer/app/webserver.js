var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
// all of our routes will be prefixed with /api
app.use('/api', router);
router.post('/Decision', function(req, res) {
    const stockValues = req.body.StockValues;
    let decision = findBestDecision(stockValues);    
    res.json(decision);   
});

app.use(express.static(__dirname))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

let port= 8080;
app.listen(port);
console.log('Webserver Listen on port ' + port);

function findBestDecision(stockValues){
    let maxDecision = {buyingDay : 0, sellingDay: 0, revenue:0 }
    for ( buyingDay =1 ; buyingDay<=stockValues.length; ++buyingDay){
        for ( sellingDay = buyingDay+1; sellingDay <= stockValues.length; ++sellingDay){
            let revenue = stockValues[sellingDay-1] - stockValues[buyingDay-1];
            if (revenue > maxDecision.revenue){
                maxDecision = {buyingDay: buyingDay, sellingDay: sellingDay, revenue: revenue};
            }
        }
    }
    return maxDecision;
}