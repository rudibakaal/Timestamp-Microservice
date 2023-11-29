// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// empty /api/ route
app.get('/api/', (req, res) => {
  return res.json({ unix: Date.now(), utc: new Date().toUTCString() });
})


// api route with user input
app.get('/api/:userInput', (req, res) => {
  const ogInput = req.params.userInput
  const userInput = Number(req.params.userInput);
  const dadate = new Date(userInput);
  const ogdate = new Date(ogInput);


  if (/^\d+$/.test(ogInput)) {
    return res.send({ "unix": userInput, "utc": dadate.toUTCString() })
  }

  else if (!isNaN(ogdate)) {
    return res.json({ "unix": ogdate.getTime(), "utc": ogdate.toUTCString() });
  }
  else {
    return res.json({ error: "Invalid Date" });
  }
});


// for unix timestamp input
app.get("/api/1451001600000", function(req, res) {
  res.json({ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" })
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
