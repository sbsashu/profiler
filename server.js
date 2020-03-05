'use strict';
let colors = require('colors');
colors.enable();
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });
let helmet = require('helmet');
let morgan = require('morgan');
let conf = require('./config');

require('./database/schema/index');
let express = require('express')
let {APP} = require('./route_api')
let app = express();
/** call routes api */

let port = conf.PORT || 3000;
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
APP(app);

app.listen(port, () => {
    console.log(('Server running on PORT').verbose, port)
});