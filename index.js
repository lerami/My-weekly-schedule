var express = require('express');
var app = express();
var path = require('path');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.static(path.join(__dirname + '/public')));

app.use(session({
	secret: 'ttsecret'
}))

app.use(function(req,res,next){
	if(typeof(req.session.schedule) == 'undefined'){
		req.session.schedule = [];
	}
	next();
})

app.get('/reset', function(req,res){
	req.session.schedule = [];
	res.redirect('/');
})

app.get('/', function(req,res){
	res.render('schedule.html.ejs',{schedule: req.session.schedule});
})

app.post('/add', urlencodedParser, function(req,res){
	if ((req.body.add != '') && (req.body.day !='')){
		req.session.schedule.push({'name': req.body.add, 'day': req.body.day});
	}
	res.redirect('/');
})

app.get('/delete/:id', function(req,res){
	if (req.params.id != ''){
		req.session.schedule.splice(req.params.id, 1);
	}
	res.redirect('/');
})


app.listen(3000);