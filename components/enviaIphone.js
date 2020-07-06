require("dotenv").config();

const shell = require("shelljs");

shell.exec(

  "mongoimport --host " +
    process.env.DB_HOST +
    " --ssl --username " +
    process.env.DB_USERNAME +
    " --password " +
    process.env.DB_PASS +
    " --authenticationDatabase admin --db serverless --collection notes --type json --file ./../results/iphone.json --jsonArray --mode merge"
);


mongo "mongodb+srv://mflix-p6kx5.mongodb.net/serverless" --m220student l0TBCt3VOOj98kN1
