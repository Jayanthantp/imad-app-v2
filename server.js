var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var config = {
  host: 'http://db.imad.hasura-app.io',
  user: 'jayanthantp',
  password: 'db-jayanthantp-26980',
  database: 'jayanthantp',
  port:'5432',
};

var pool = new Pool(config);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/test-db', function (req, res) {
    pool.query('select * from test', function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else 
        {
            res.send(JSON.stringify(result));
        }
    })
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
