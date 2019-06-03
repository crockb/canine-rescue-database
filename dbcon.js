var mysql = require('mysql');
var pool = mysql.createPool({
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_burrisl',
    password        : '5665',
    database        : 'cs361_burrisl',
    dateStrings: 'date'
});
module.exports.pool = pool;


