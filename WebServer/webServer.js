const { findBestDecision } = require("./findBestDecision");

const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname,"fe_app")));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,"fe_app","index.html"));
});

app.get('/Decision', function(req, res) {   
    const stockValues = JSON.parse(req.query.StockValues);
    let decision = findBestDecision(stockValues);    
    res.json(decision);   
});


const port = 8080; //can't use 80 because of previliges issue
app.listen(port);
console.log('Webserver Listen on port ' + port);