require('dotenv').config();
require('./database/schema/index')
let express = require('express')
let app = express();
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.listen(port, () => {
    console.log('Server running on PORT', port)
})