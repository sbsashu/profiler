'use strict';
let colors = require('colors');
let path = require('path');
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
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('profiler_client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'profiler_client', 'build', 'index.html'));
  })
}
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
APP(app);

app.listen(port, () => {
    console.log(('Server running on PORT').verbose, port)
});