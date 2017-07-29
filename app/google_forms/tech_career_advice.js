var googleService = require('./googleService');
var TechCareer = require('../models/tech_career');
var db = require('../../config/database');

function processSurvey(err, response) {
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
          job_title: row[2],
          your_start: row[3],
          your_job: row[4],
          advice: row[5],
          contact: row[6],
          public: row[7] === 'Anyone who visits CodingForProduct.com can view my responses'
        }

        TechCareer.create(data)
        .then((res)=> console.log('import', row[1]))
        .catch((err) => console.log('error!!', err));
      })
    }
    console.log('done importing');
    db.destroy();
  }

const options = {
  spreadsheetId: process.env.TECH_CAREER_SHEET_ID,
  range: process.env.TECH_CAREER_SHEET_RANGE,
  cb: processSurvey
}

googleService.connectToSheets(options);
