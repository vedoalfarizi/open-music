const { Pool } = require('pg');

class Auth {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(token) {
    await this._pool.query({
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    });
  }
}

module.exports = Auth;
