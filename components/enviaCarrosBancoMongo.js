
require('dotenv').config()
const shell = require("shelljs");


  shell.exec(
          "mongoimport --host "+process.env.DB_HOST+" --ssl --username "+process.env.DB_USERNAME+" --password "+process.env.DB_PASS+" --authenticationDatabase admin --db serverless --collection notes --type json --file ./../results/cars-olx.json --jsonArray --mode merge"
        );

