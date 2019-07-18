require('dotenv').config()
const shell = require('shelljs')

shell.exec(
  'mongoimport --host mflix-shard-0/mflix-shard-00-00-p6kx5.mongodb.net:27017,mflix-shard-00-01-p6kx5.mongodb.net:27017,mflix-shard-00-02-p6kx5.mongodb.net:27017 --ssl --username m220student --password l0TBCt3VOOj98kN1 --authenticationDatabase admin --db serverless --collection notes --type json --file ./../results/cars-olx.json --jsonArray --mode merge'
)
