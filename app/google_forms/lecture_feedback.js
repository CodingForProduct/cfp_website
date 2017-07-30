var googleService = require('./googleService');
var LectureFeedback = require('../models/lecture_feedback');
var db = require('../../config/database');

var feedbackWeek;

function processFirstFeedback(err, response) {
  if (err) {
    console.log('The API returned an error: ' + err);
    return;
  }

  var rows = response.values;
  if (rows.length == 0) {
    console.log('No data found.');
  } else {
    rows.forEach((row) => {
      var data = {
        created_at: row[0],
        name: row[1],
        start: row[2],
        stop: row[3],
        continue: row[4],
        public: row[5] === 'Yes',
        additional: row[7],
        week: 1,
      }

      LectureFeedback.create(data)
        .then((res)=> console.log('import', row[1]))
        .catch((err) => console.log('error!!', err));
    })
  }
}

function processSecondWeek(err, response) {
  processFeedback(err, response, 2)
}

function processThirdWeek(err, response) {
  processFeedback(err, response, 3)
}

function processFourthWeek(err, response) {
  processFeedback(err, response, 4)
}

function processFeedback(err, response, week) {
  if (err) {
    console.log('The API returned an error: ' + err);
    return;
  }

  var rows = response.values;
  if (rows.length == 0) {
    console.log('No data found.');
  } else {
    rows.forEach((row) => {
      var data = {
        created_at: row[0],
        name: row[1],
        start: row[2],
        stop: row[3],
        continue: row[4],
        public: row[5] === 'Yes',
        additional: row[6],
        week: week
      }

      LectureFeedback.create(data)
        .then((res)=> console.log('import', row[1]))
        .catch((err) => console.log('error!!', err));
    })

  }
}

const week1 = {
  spreadsheetId: process.env.LECTURE_FEEDBACK_WK1_SHEET_ID,
  range: process.env.LECTURE_FEEDBACK_SHEET_RANGE,
  cb: processFirstFeedback,
}

const week2 = {
  spreadsheetId: process.env.LECTURE_FEEDBACK_WK2_SHEET_ID,
  range: process.env.LECTURE_FEEDBACK_SHEET_RANGE,
  cb: processSecondWeek,
}

const week3 = {
  spreadsheetId: process.env.LECTURE_FEEDBACK_WK3_SHEET_ID,
  range: process.env.LECTURE_FEEDBACK_SHEET_RANGE,
  cb: processThirdWeek,
}

const week4 = {
  spreadsheetId: process.env.LECTURE_FEEDBACK_WK4_SHEET_ID,
  range: process.env.LECTURE_FEEDBACK_SHEET_RANGE,
  cb: processFourthWeek,
}

var weeks = [week1, week2, week3, week4]
weeks.forEach(week =>  googleService.connectToSheets(week))
