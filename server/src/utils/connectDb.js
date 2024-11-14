const mongoose = require('mongoose');
const { MONGODB_URI } = require('../configs/config');


const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDb;