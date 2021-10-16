const { Pool } = require('pg');

const InvariantError = require('../../exceptions/InvariantError');

const {
  songPlaylistModel,
} = require('../../utils/model');

class SongPlaylistService {
  constructor(songService, cacheService) {
    this._pool = new Pool();
    this._songService = songService;
    this._cacheService = cacheService;
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

    await this._cacheService.delete(`songPlaylist:${payload.playlistId}`);

    return result.rows[0];
  }

  async getUserSongPlaylist(id) {
    try {
      const result = await this._cacheService.get(`songPlaylist:${id}`);
      return JSON.parse(result);
    } catch (error) {
      const result = await this._pool.query({
        text: `SELECT song_playlists.playlist_id, songs.* FROM song_playlists
        LEFT JOIN songs ON songs.id = song_playlists.song_id
        WHERE song_playlists.playlist_id = $1`,
        values: [id],
      });

      const mappedResult = result.rows.map(songPlaylistModel);
      await this._cacheService.set(`songPlaylist:${id}`, JSON.stringify(mappedResult));

      return mappedResult;
    }
  }

  async deleteSongPlaylistById(songId, playlistId) {
    await this._songService.verifySongId(songId);

    const result = await this._pool.query({
      text: 'DELETE FROM song_playlists WHERE song_id = $1 AND playlist_id = $2',
      values: [songId, playlistId],
    });

    if (!result.rowCount) throw new InvariantError('Gagal menghapus lagu dari playlist');

    await this._cacheService.delete(`songPlaylist:${playlistId}`);
  }
}

module.exports = SongPlaylistService;
