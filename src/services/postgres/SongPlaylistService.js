const { Pool } = require('pg');

class SongPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async addSongPlaylist(payload) {
    const insertedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO song_playlists VALUES($1, $2, $3, $3)',
      values: [...Object.values(payload), insertedAt],
    });

    console.log(result.rows[0]);

    return result.rows[0];
  }
}

module.exports = SongPlaylistService;
