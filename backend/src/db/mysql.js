// 1. 导入 mysql 模块
const mysql = require('mysql2')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MYy%x&OfomFcs&Y0',
    database: 'jlapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
 
module.exports = db