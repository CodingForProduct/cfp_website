function convertStringToBoolean(text) {
  return text === 'true';
}

function validDate(dateString) {
  // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
  var tempDate =  new Date(dateString);
  return !isNaN(tempDate.getTime())
}

function trimPayload(data) {
  Object.keys(data).forEach(key => {
    const trimmedValue = data[key].trim();
    data[key] = trimmedValue === '' ? null : trimmedValue;
  })
  return data;
}

module.exports = {
  convertStringToBoolean,
  validDate,
  trimPayload
}
