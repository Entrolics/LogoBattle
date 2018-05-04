var express = require('express');
var app = express();
var path = require('path');
var querystring = require("querystring");
var myParser = require("body-parser");

var ids = [];

var totalVotes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

app.use(myParser.urlencoded({extended : true}));

app.use('/Logos', express.static(__dirname + "/Logos"));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + '/logobattle.html'));
});


app.get("/vote", function(request, response) {
    //var votes = querystring.parse(postdata).votes;

    var vote0 = request.query.vote0;
    var vote1 = request.query.vote1;
    var vote2 = request.query.vote2;
    var id = request.query.id;

    if (ids.indexOf(id) > -1){
        response.send("You already voted! Wait to see the results soon :)");
    }
    else{
        ids.push(id);
        totalVotes[vote0]++;
        totalVotes[vote1]++;
        totalVotes[vote2]++;
        response.send("Your votes have been registered! Thanks for voting!");
    }
});

app.get("/totalvotes", function(request, response) {
    //var votes = querystring.parse(postdata).votes;
    response.send(totalVotes);
});

app.listen(3000);
