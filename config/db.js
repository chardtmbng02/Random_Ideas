const mongoose = require('mongoose');
const { CLIENT_RENEG_WINDOW } = require('tls');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;