require('dotenv').config();

const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
    BANK: {
        type: String
    },
    IFSC: {
        type: String
    },
    BRANCH: {
        type: String
    },
    CENTRE: {
        type: String
    },
    DISTRICT: {
        type: String
    },
    STATE: {
        type: String
    },
    ADDRESS: {
        type: String
    },
    CITY: {
        type: String
    },
});

module.exports.bankModel = mongoose.model.bankModel || mongoose.model('bankModel',bankSchema)