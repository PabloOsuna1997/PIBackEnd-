const mysql = require('mysql');
const { promisify } = require('util');  //to use as a promise
require('dotenv').config();

const database = {
    host: process.env.IP_DB,          //database ip
    user:  process.env.USER_DB,              //user name
    password: process.env.PASS_USER_DB,      //password
    database: process.env.NAME_DB,  //basedata name 
    insecureAuth : true
}

const bd = mysql.createPool(database);
bd.getConnection((err,connection) =>{
    if(err){ //err exist
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNETION LOST');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code == 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }
    //err not exist
    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

bd.query = promisify(bd.query);
module.exports = bd;