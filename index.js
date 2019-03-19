// imports
const http = require('http'),
      express = require('express'),
      fs = require('fs'),
      path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

var app = express();
var server = http.createServer(app);

//app.engine('.html', require('ejs').__express);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');

// server static files (css, js, etc.)
app.use(express.static(path.join(__dirname, 'public')))

// load webpage
app.get('/', function(req, res) {
    fs.readFile(__dirname + '/webpage.html', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        //res.render('webpage');
        res.end();
    });
});

// Error handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});