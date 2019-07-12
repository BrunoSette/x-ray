require('dotenv').config()
const shell = require("shelljs");


  shell.exec(
          "mongoimport --host "+process.env.DB_HOST+" --ssl --username m220student --password "+process.env.DB_PASS+" --authenticationDatabase admin --db serverless --collection notes --type json --file recife.json --jsonArray --mode merge"
        );

