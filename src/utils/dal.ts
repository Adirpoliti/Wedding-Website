const mongoose = require('mongoose')

export const mangooseConnection = mongoose.connect('',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error: any) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

