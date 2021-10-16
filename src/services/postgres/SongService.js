const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const {
  songModel,
} = require('../../utils/model');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong(payload) {
    const id = `song-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $7) RETURNING id',
      values: [id, ...Object.values(payload), insertedAt],
    });
    if (!result.rows[0].id) throw new InvariantError('Lagu gagal ditambahkan');

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this._pool.query('SELECT id, title, performer FROM songs');

    return result.rows;
  }

  async getSongById(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM songs where id = $1',
      values: [id],
    });

    if (!result.rowCount) throw new NotFoundError('Lagu tidak ditemukan');

    return songModel(result.rows[0]);
  }

  async editSongById(id, payload) {
    const updatedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [...Object.values(payload), updatedAt, id],
    });

    if (!result.rowCount) throw new NotFoundError('Gagal memperbarui lagu. Lagu tidak ditemukan');
  }

  async deleteSongById(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    });

    if (!result.rowCount) throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
  }

  async verifySongId(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM songs where id = $1',
      values: [id],
    });

    if (!result.rowCount) throw new InvariantError('ID lagu tidak valid');
  }
}

module.exports = SongService;
