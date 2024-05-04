const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'ringo',
  password: '12345',
  database: 'fullstack_app',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;
