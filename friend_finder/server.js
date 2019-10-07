var express = require('express');
var app = express();

//making static assets
app.use(express.static("public"));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ucbsf2019',
  database : 'friends_db'
});
 
connection.connect();
 
app.get('/presidents', function(req, res){
	connection.query('SELECT * FROM presidents', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

// by default the forms use req.query so let's not fight it
//localhost:3000/insert?name=justin
app.get('/insert', function(req, res){
	// res.json(req.query);

	if (req.query.name.length > 1){
		connection.query('INSERT INTO presidents (name) VALUES (?)', [req.query.name], function (error, results, fields) {
		  if (error) res.send(error)
		  else res.redirect('/');
		});
	}else{
		res.send('invalid name')
	}
});

//localhost:3000/remove?id=3
app.get('/delete', function(req, res){
	// res.json(req.query);

	if (req.query.id){
		// ; DELETE FROM people;
		// '1 AND DELETE FROM people'
		connection.query('DELETE FROM presidents WHERE id = ?', [req.query.id], function (error, results, fields) {
		  if (error) res.send(error)
		  else res.redirect('/');
		});
	}else{
		res.send('you need an id')
	}
});

//localhost:3000/update?id=3&name=newname
app.get('/update', function(req, res){
	// res.json(req.query);

	if (req.query.id && req.query.name.length > 1){
		connection.query('UPDATE presidents SET name = ? WHERE id = ?', [req.query.name, req.query.id], function (error, results, fields) {
		  if (error) res.send(error)
		  else res.redirect('/');
		});
	}else{
		res.send('you need an id')
	}
});


app.listen(3025, function(){
	console.log('listening on 3025');
});