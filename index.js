// imports
const http = require('http'),
      express = require('express'),
      fs = require('fs'),
      path = require('path'),
      fork = require('child_process').fork,
      url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

var app = express();
var server = http.createServer(app);

//app.engine('.html', require('ejs').__express);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');

// server static files (css, js, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded( {
    extended: true
}));

// TODO: pass absolute dir to function for proper py exec
/*var hydrus_fork = fork('./public/js/py-handle-test.js')
hydrus_fork.on('message', (msg) => {
    console.log('msg from hydrus_fork: ', msg);
});*/

//var hydrus_func = require('./public/js/python-handle.js')

// load webpage
app.get('/', function(req, res) {
    fs.readFile(__dirname + '/webpage.html', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });

});

// TODO: sanitize input for tags only
app.post('/hydrus_submit', function(req, res) {
    var hydrus_input = req.body.hydrus_command;
    // SANITIZE INPUT HERE
    if (hydrus_input == 'api_ver') {
        hydrusCall(hydrus_input);
    }
    
});

// Error handling
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function hydrusCall(apiCall) {
    console.log('entered hydruscall with:', apiCall);
    var spawn = require('child_process').spawn;
    var py = spawn('python', ['python/hydrus-call.py', apiCall]);
    //console.log.toString(py);
    py.stdout.on('data', function(data) {
        var hydrus_data = data;
        console.log('hydrus data: ', hydrus_data.toString());
    });
    /*py.stdout.on('end', function(){
        console.log('hydrus end!');
    });*/
};