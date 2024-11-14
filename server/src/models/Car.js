const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        url: String,
        public_id: String
    }],
    tags: [{
        type: String,
        trim: true
    }],
    car_type: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    dealer: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

carSchema.index({
    title: 'text',
    description: 'text',
    tags: 'text',
    car_type: 'text',
    company: 'text',
    dealer: 'text'
});

module.exports = mongoose.model('Car', carSchema);