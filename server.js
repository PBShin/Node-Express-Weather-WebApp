const request= require('request');
const apiKey = 'ca2c8e9e8cde76ff7f239c77d8a47531';
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/', function (req, res) {
    var city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

})

request(url, function(err, res, body) {
    if (err) {
        res.render('index.html');
        let weather= null;
        let error = 'Error, please try again';
    } else {
        let weather = JSON.parse(body);
        if (weather.main == undefined) {
            res.render('index.html');
            let weather = null;
            let error = 'Error, please try again';
        } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index.html');
            let weather = weatherText;
            let error = null;
        }
    }
})

exports.weather = weather;
exports.error = error;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})