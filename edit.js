var fs = require('fs')
fs.readFile('results-recife.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\n\t\t\t\t\t\t\t\t\t/g, '');

  fs.writeFile('results-recife.json', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});