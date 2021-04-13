// define date file's structure
const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

const generateDate = input => {
  // is date string a number?
  return !isNaN(input)
    ? // then parse it and generate date in ms
      new Date(parseInt(input))
    : // else, only create a new date in ms
      new Date(input);
};

const validateInput = date => {
  // is date a valid date?
  return !isNaN(date.getTime())
    ? // then format it in the required structure
      getTimestamp(date)
    : // otherwise, display invalid date message
      { error: "Invalid Date" };
};

module.exports = { generateDate, validateInput };
