// init project & required Node imports
const express = require("express"),
  bodyParser = require("body-parser"),
  // enable CORS so that your API is remotely testable by FCC
  cors = require("cors"),
  // create an express instance and instantiate bodyParser & CORS
  app = (module.exports = express());

// some legacy browsers choke on 204
app.use(cors({ optionSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// handles the empty date parameters
app.get("/api/timestamp/", (req, res) => {
  req = new Date();
  res.json({ unix: req.valueOf(), utc: req.toUTCString() });
});

app.get("/api/timestamp/:date", function(req, res, next) {
  // gets the request data for date
  let { date } = req.params;
  const dateFormattingOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  // if it's a number
  if (!isNaN(date)) {
    date = parseInt(date);
    const msNumber = new Date(date);
    res.json({ unix: date, utc: msNumber.toUTCString() });
  }

  // if it's an invalid format
  else if (isNaN(Date.parse(date))) {
    res.json({ unix: null, utc: "Invalid Date" });
  }

  // if it's a string value
  else {
    var msNumber = new Date(date);
    msNumber.toLocaleDateString("en-us", dateFormattingOptions); // transform unix date from ms to seconds
    var unixDate = new Date(date).getTime() / 1000;
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// Date.valueOf() and Date.toUTCString() will generate the correct strings for unix: and utc:
//
// Date.prototype.toUTCString() -> // Converts a date to a string using the UTC timezone.
// Date.prototype.valueOf() ->
// Returns the primitive value of a Date object. Overrides the Object.prototype.valueOf() method.
