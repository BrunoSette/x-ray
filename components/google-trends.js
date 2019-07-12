const Xray = require("x-ray");
const shell = require("shelljs");
const googleTrends = require("google-trends-api");
const fs = require("fs");
const keyword = "toyota";
const fileName = "trend-" + keyword + ".json";

googleTrends
  .interestOverTime({
    keyword: keyword,
    startTime: new Date("2017-01-01"),
    category: 863, // Check cars category brands in https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories
    resolution: "CITY",
    hl: "pt-BR",
    geo: "BR-PE"
  })
  .then(res => {
    fs.writeFile(fileName, res, "utf8", function(err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  })
  .catch(err => {
    console.log(err);
  });

setTimeout(function() {
  shell.exec(
    "mongoimport --host localhost:27017 --db google-trends --collection " +
      keyword +
      " --type json --file " +
      fileName +
      " --mode merge"
  );
  //shell.exec('mongoimport --host mflix-shard-0/mflix-shard-00-00-p6kx5.mongodb.net:27017,mflix-shard-00-01-p6kx5.mongodb.net:27017,mflix-shard-00-02-p6kx5.mongodb.net:27017 --ssl --username m220student --password m220password --authenticationDatabase admin --db mflix --collection googleTrends --type json --file '+ fileName + ' --jsonArray --mode merge')
}, 3000);
