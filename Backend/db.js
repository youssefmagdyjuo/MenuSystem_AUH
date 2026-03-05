const { MongoClient } = require('mongodb')
const dotenv = require("dotenv");
dotenv.config();
const mongodbUrl = process.env.MONGODB_URL;
let dbConnection;
const connectDB = (cb) => {
    MongoClient.connect(mongodbUrl)
        .then((client) => {
            console.log("Connected to MongoDB");
            dbConnection = client.db();
            return cb();
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            return cb(error);
        });
}
const getDB = () => {
    if (!dbConnection) {
        throw new Error("Database not initialized");
    }
    return dbConnection;
}; 
module.exports = { connectDB, getDB };