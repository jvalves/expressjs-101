const mysql = require('mysql');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('error connecting', err.stack);
        throw err;
      }
    });
  }

  selectAll(table) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * from ??', [table], (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  disconnect() {
    this.connection.end();
  }

  destroy() {
    this.connection.destroy();
  }
}

module.exports = new DB();
