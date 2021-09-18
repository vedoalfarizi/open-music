const bcrypt = require('bcrypt');

const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const AuthenticationError = require('../../exceptions/AuthenticationError');
const InvariantError = require('../../exceptions/InvariantError');

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyNewUsername(username) {
    const result = await this._pool.query({
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    });

    if (result.rowCount > 0) throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this._pool.query({
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    });
    if (!result.rowCount) throw new InvariantError('User gagal ditambahkan');

    return result.rows[0].id;
  }

  async verifyUserCredential({ username, password }) {
    const result = await this._pool.query({
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    });
    if (!result.rowCount) throw new AuthenticationError('Kredensial yang Anda berikan salah');

    const { id, password: hashedPassword } = result.rows[0];
    if (!await bcrypt.compare(password, hashedPassword)) throw new AuthenticationError('Kredensial yang Anda berikan salah');

    return id;
  }

  async verifyUserById(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM users where id = $1',
      values: [id],
    });

    if (!result.rowCount) throw new InvariantError('ID user tidak valid');
  }
}

module.exports = UserService;
