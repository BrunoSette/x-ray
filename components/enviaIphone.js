require("dotenv").config();

const shell = require("shelljs");

shell.exec(
  "mongoimport --host mflix-shard-0/mflix-shard-00-00-p6kx5.mongodb.net:27017,mflix-shard-00-01-p6kx5.mongodb.net:27017,mflix-shard-00-02-p6kx5.mongodb.net:27017 --ssl --username fdsjfhkjsdf8289217389 --password 7vhVqMb3AtKbESUU --authenticationDatabase admin --db serverless --collection iphones --type json --file ./../results/iphone.json --jsonArray --mode merge"
);

// mongo "mongodb+srv://mflix-p6kx5.mongodb.net/serverless" --m220student
