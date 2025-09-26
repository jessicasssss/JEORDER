const sql = require('mysql2');
const path = require('path');

require('dotenv').config({path:path.join(__dirname, "../../.env")});

const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dateStrings: true 
})

db.connect((err) =>{
    if(err){
        return console.log(err);
    }
})

module.exports = db;
