const mongoose = require('mongoose');
const config = require('./config');

dbURI = config.mongodb.uri;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING || dbURI);
        console.log("Database connected:", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;