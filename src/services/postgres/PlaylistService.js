const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const AuthorizationError = require('../../exceptions/AuthorizationError');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
  }

  async addPlaylist(payload) {
    const id = `playlist-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO playlists VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, ...Object.values(payload), insertedAt],
    });
    if (!result.rows[0].id) throw new InvariantError('Playlist gagal ditambahkan');

    return result.rows[0].id;
  }

  async getUserPlaylist(owner) {
    const result = await this._pool.query({
      text: `SELECT playlists.id, playlists.name, users.username FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.owner = $1`,
      values: [owner],
    });

    return result.rows;
  }

  async getPlaylistById(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    });

    if (!result.rowCount) throw new NotFoundError('Playlist tidak ditemukan');

    return result.rows[0];
  }

  async deletePlaylistById(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    });
    if (!result.rowCount) throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const playlist = await this.getPlaylistById(playlistId);

    if (playlist.owner !== owner) throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }

  async verifyPlaylistUserAccess(playlistId, userId) {
    const playlist = await this.getPlaylistById(playlistId);

    if (playlist.owner !== userId) {
      await this._collaborationService.verifyCollaborator(
        playlistId, userId,
      );
    }
  }
}

module.exports = PlaylistService;
