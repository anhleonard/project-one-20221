let express = require('express');
let cors = require('cors');
let app = express();
let path = require('path');
let methodOverride = require('method-override');
let bcrypt = require('bcrypt');

let mongoose = require('mongoose');
const bodyParser = require('body-parser');

//import các route chính vào đây
const loginRoute = require('./routers/loginRoute');
let loginController = require('./controllers/loginController');
const homeRoute = require('./routers/homeRoute');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cors());

//route chính
app.use('/login', loginRoute);
app.use('/', homeRoute);
app.post('/home', loginController.passLogin);

mongoose.connect('mongodb://127.0.0.1:27017/cnpm_db');

let db = mongoose.connection;
//bắt sự kiện error
db.on ('error', function(err) {
    if(err) console.log(err);
})
//bắt sk open
db.once('open', function() {
    console.log('Connect successfully!');
    console.log('http://localhost:3001');
})

app.listen(3001);