const mysql = require("mysql2");

const conn = mysql.createConnection({
    host : process.env.dbHost,
    password : process.env.dbPass,
    user : process.env.dbUser,
    database : process.env.dbName
});

conn.connect((err)=>{
    if(err){
        console.log("Couldn't connect with database...");
    }else{
        console.log("Database connected...")
    }
});

module.exports = conn;