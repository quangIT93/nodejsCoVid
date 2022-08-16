const  express = require('express');
const morgan = require("morgan")
const cors = require("cors");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')

const path = require('path')
const db = require('./config/db')

const app = express();
app.use(cors());


// tạo cookies va gán cookies
app.use(cookieParser());


const route = require('./routes')
app.use(morgan('combined'));

app.engine('handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', 'src/resources/views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'resources/css')))
app.use(express.static(path.join(__dirname, 'resources/js')))
app.use(express.static(path.join(__dirname, 'resources/json')))


app.use(methodOverride('_method'))

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

db.connect()

route(app)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port at http://localhost:${process.env.PORT}`);
});

