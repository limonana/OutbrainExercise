var express    = require('express');        // call express
var app        = express();                 // define our app using express
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

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Stock API Listen on port ' + port);

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