const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const AuthorizationError = require('../../exceptions/AuthorizationError');

const InvariantError = require('../../exceptions/InvariantError');

class CollaborationService {
  constructor(userService) {
    this._pool = new Pool();
    this._userService = userService;
  }

  async addCollaborator(payload) {
    await this._userService.verifyUserById(payload.userId);

    const id = `collab-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO collaborations VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, ...Object.values(payload), insertedAt],
    });
    if (!result.rows[0].id) throw new InvariantError('Gagal menambahkan collaborator');

    return result.rows[0].id;
  }

  async deleteCollaborator(payload) {
    await this._userService.verifyUserById(payload.userId);

    const result = await this._pool.query({
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [...Object.values(payload)],
    });

    if (!result.rowCount) throw new InvariantError('Gagal menghapus kolaborasi');
  }

  async verifyCollaborator(playlistId, userId) {
    const result = await this._pool.query({
      text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    });

    if (!result.rowCount) throw new AuthorizationError('Akses playlist tidak diizinkan');
  }

  async getCollabotarorPlaylist(userId) {
    const result = await this._pool.query({
      text: `SELECT playlists.id, playlists.name, users.username FROM collaborations
      LEFT JOIN playlists ON playlists.id = collaborations.playlist_id
      LEFT JOIN users ON users.id = playlists.owner
      WHERE collaborations.user_id = $1`,
      values: [userId],
    });

    return result.rows;
  }
}

module.exports = CollaborationService;
