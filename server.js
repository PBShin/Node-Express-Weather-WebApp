const request= require('request');
const apiKey = 'ca2c8e9e8cde76ff7f239c77d8a47531';
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var weather = '';
var error='';

app.use(express.static(__dirname+'./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/', function (req, res, next) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    request(url, function(err, response, body) {
    if (err) {
        res.render('index.html');
        var weather= null;
        var error = 'Error, please try again';
    } else {
        weather = JSON.parse(body);
        if (weather.main == undefined) {
            res.sendFile('index.html');
            var weather = null;
            var error = 'Error, please try again';
        } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.sendFile('index.html');
            var weather = weatherText;
            var error = null;
        }
    }
})
})

exports.weather = weather;
exports.error = error;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})