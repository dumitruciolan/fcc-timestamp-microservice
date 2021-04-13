const { generateDate, validateInput } = require("./helpers/functions");

// add the required Node imports & init project
const express = require("express"),
  // enable CORS so the API is remotely testable
  cors = require("cors"),
  app = express();

// instantiate express & CORS (some legacy browsers choke on 204)
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

// display main HTML page
app.get("/", (_, res) => res.sendFile(__dirname + "/views/index.html"));

// handle empty date scenario
app.get("/api/timestamp", (_, res) =>
  res.json({ unix: Date.now(), utc: new Date().toUTCString() })
);

// handle non-empty date scenarios
app.get("/api/timestamp/:date_string", (req, res) => {
  // gets the request data for date
  const { date_string } = req.params,
    date = generateDate(date_string),
    timestamp = validateInput(date);

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
