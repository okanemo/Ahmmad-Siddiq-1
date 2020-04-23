require('dotenv').config();

const mysql = require('mysql');
const connecting = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connecting.connect((err)=>{
    if(err) console.log(`Error ${err}`)
})

module.exports = connecting;