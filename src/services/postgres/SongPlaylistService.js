const { Pool } = require('pg');

const InvariantError = require('../../exceptions/InvariantError');

const {
  songPlaylistModel,
} = require('../../utils/model');

class SongPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async verifySongAlreadyInPlaylist({ songId, playlistId }) {
    const result = await this._pool.query({
      text: 'SELECT * FROM song_playlists WHERE song_id = $1 AND playlist_id = $2',
      values: [songId, playlistId],
    });

    if (result.rowCount) throw new InvariantError('Lagu sudah ada di dalam playlist');
  }

  async addSongPlaylist(payload) {
    await this.verifySongAlreadyInPlaylist(payload);

    const insertedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO song_playlists VALUES($1, $2, $3, $3)',
      values: [...Object.values(payload), insertedAt],
    });

    if (!result.rowCount) throw new InvariantError('Gagal menambahkan lagu ke dalam playlist');

    return result.rows[0];
  }

  async getUserSongPlaylist(id) {
    const result = await this._pool.query({
      text: `SELECT song_playlists.playlist_id, songs.* FROM song_playlists
      LEFT JOIN songs ON songs.id = song_playlists.song_id
      WHERE song_playlists.playlist_id = $1`,
      values: [id],
    });

    return result.rows.map(songPlaylistModel);
  }
}

module.exports = SongPlaylistService;
