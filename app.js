require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

const port = process.env.PORT || process.env.SERVER_PORT;

app.use(cors());
app.use('/upload', express.static('./upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const issue = {
    origin: true,
    methods: ["PUT,PATCH,POST,DELETE"],
    credentials: true,
    maxAge: 3600
  };

app.options('/', cors())
const router = require('./src/router/index');

app.use('/', cors(issue), router);
app.listen(port, (req, res)=>{
    console.log(`App Listen port ${port}`)
})