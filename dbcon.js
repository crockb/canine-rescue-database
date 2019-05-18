var mysql = require('mysql');
var pool = mysql.createPool({
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_crockb',
    password        : '6754',
    database        : 'cs361_crockb',
    dateStrings: 'date'
});
module.exports.pool = pool;


