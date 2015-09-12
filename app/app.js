// npm modules
var express 				= require('express'),
		app 						= express();


// View Config
// =============================================================================
var		port 						= process.env.PORT || 3000;


// static file handling
app.use(express.static(__dirname));

app.get('/', function(req, res) {

	res.render('index.html')
})

// START THE SERVER
// =============================================================================
var server 					= app.listen(port);
console.log('Starting Node Server on Port ' + port);