// add the required Node imports & init project
const express = require("express"),
  // enable CORS so the API is remotely testable
  cors = require("cors"),
  app = express();

// instantiate express & CORS (some legacy browsers choke on 204)
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

// display main HTML page
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// define date file's structure
const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

// handle empty date scenario
app.get("/api/timestamp", (_, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

// handle non-empty date scenarios
app.get("/api/timestamp/:date_string", (req, res) => {
  // gets the request data for date
  let timestamp = {},
    { date_string } = req.params;

  // is date_string a number?
  const date = !isNaN(date_string)
    ? // then parse it and generate date in ms
      new Date(parseInt(date_string))
    : // else, only create a new date in ms
      new Date(date_string);

  // is date a valid date?
  !isNaN(date.getTime())
    ? // then format it in the required structure
      (timestamp = getTimestamp(date))
    : // otherwise, display invalid date message
      (timestamp = { error: "Invalid Date" });

  // JSON format the processed date and return it
  res.json(timestamp);
});

// Reply not found to inexistent routes
app.use((_, res) =>
  res
    .status(404)
    .type("txt")
    .send("Not found")
);

// start the server & listen for requests :)
const listener = app.listen(process.env.PORT || 4100, err => {
  if (err) throw err;
  console.log(`Your app is listening on port ${listener.address().port}`);
});
