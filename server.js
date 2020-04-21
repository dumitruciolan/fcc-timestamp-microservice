// init project & required Node imports
const express = require("express"),
  // enable CORS so that your API is remotely testable by FCC
  cors = require("cors"),
  // create an express instance
  app = (module.exports = express());

// instantiate bodyParser & CORS (some legacy browsers choke on 204)
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// handle empty date scenario
app.get("/api/timestamp/", (req, res) => {
  req = new Date();
  res.json({ unix: req.valueOf(), utc: req.toUTCString() });
});

// define JSON structure
const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

// handle the other scenarios
app.get("/api/timestamp/:date_string?", function(req, res) {
  // gets the request data for date
  let { date_string } = req.params,
    timestamp;

  // check date format
  const date = !isNaN(date_string)
    ? new Date(parseInt(date_string))
    : new Date(date_string);

  // check if
  !isNaN(date.getTime())
    ? (timestamp = getTimestamp(date))
    : (timestamp = { unix: null, utc: "Invalid Date" });

  // return the response
  res.json(timestamp);
});
// start the server & listen for requests :)
const listener = app.listen(process.env.PORT || 4100, err => {
  if (err) throw err;
  console.log(`Your app is listening on port ${listener.address().port}`);
});
