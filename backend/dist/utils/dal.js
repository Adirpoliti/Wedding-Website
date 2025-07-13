"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangooseConnection = void 0;
const mongoose = require('mongoose');
exports.mangooseConnection = mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to MongoDB Atlas');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});
