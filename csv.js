// const csvToJson = require('convert-csv-to-json');

// const fileInputName = 'sermons.csv';
// const fileOutputName = 'sermons.json';

// csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);

const csvFilePath = './sermons.csv';
const csv = require('csvtojson/v2');

csv({ ignoreEmpty: true })
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(JSON.stringify(jsonObj, null, 2));
  });
