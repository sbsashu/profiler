require('dotenv').config();

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let options = {useUnifiedTopology: true, useNewUrlParser: true}

mongoose.connect(process.env.DB_URL, options)
    .then(res => {
        console.log('Database connected sucessfully !')
    })
    .catch(e => console.log('ERROR ', e));