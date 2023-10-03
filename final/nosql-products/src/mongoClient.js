const { MongoClient } = require("mongodb");

const client = new MongoClient(
    'mongodb+srv://workshop-user:federationworkshop1@cluster0.m2kevbh.mongodb.net/?retryWrites=true&w=majority'
);
  
const collection = client.db("ecommerce").collection("products");  

client.connect();

module.exports.dbClient = client;
module.exports.dbCollection = collection;
