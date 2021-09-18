const wrapper = require('../../utils/wrapper');

class SongPlaylistHandler {
  constructor(service, validator, songService, playlistService) {
    this._service = service;
    this._validator = validator;
    this._songService = songService;
    this._playlistService = playlistService;

    this.postSongPlaylistHandler = this.postSongPlaylistHandler.bind(this);
  }

  async postSongPlaylistHandler({ auth: { credentials }, payload, params }, h) {
    this._validator.validatePostSongPlaylist(payload);

    const { id } = credentials;
    const { songId } = payload;
    const { playlistId } = params;

    await this._songService.getSongById(songId);
    await this._playlistService.verifyPlaylistOwner(playlistId, id);
    await this._service.addSongPlaylist({ songId, playlistId });

    return wrapper.successResponse(h, null, 'Lagu berhasil ditambahkan ke playlist', 201);
  }
}

module.exports = SongPlaylistHandler;
