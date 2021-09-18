const wrapper = require('../../utils/wrapper');

class SongPlaylistHandler {
  constructor(service, validator, songService, playlistService) {
    this._service = service;
    this._validator = validator;
    this._songService = songService;
    this._playlistService = playlistService;

    this.postSongPlaylistHandler = this.postSongPlaylistHandler.bind(this);
    this.getSongPlaylistHandler = this.getSongPlaylistHandler.bind(this);
    this.deleteSongPlaylistByIdHandler = this.deleteSongPlaylistByIdHandler.bind(this);
  }

  async postSongPlaylistHandler({ auth: { credentials }, payload, params }, h) {
    this._validator.validatePostSongPlaylist(payload);

    const { id } = credentials;
    const { songId } = payload;
    const { playlistId } = params;

    await this._songService.getSongById(songId);
    await this._playlistService.verifyPlaylistUserAccess(playlistId, id);
    await this._service.addSongPlaylist({ songId, playlistId });

    return wrapper.successResponse(h, null, 'Lagu berhasil ditambahkan ke playlist', 201);
  }

  async getSongPlaylistHandler({ auth: { credentials }, params }, h) {
    const { id } = credentials;
    const { playlistId } = params;

    await this._playlistService.verifyPlaylistUserAccess(playlistId, id);
    const songs = await this._service.getUserSongPlaylist(playlistId);

    return wrapper.successResponse(h, { songs }, null);
  }

  async deleteSongPlaylistByIdHandler({ auth: { credentials }, payload, params }, h) {
    this._validator.validateDeleteSongPlaylist(payload);

    const { id } = credentials;
    const { songId } = payload;
    const { playlistId } = params;

    await this._playlistService.verifyPlaylistUserAccess(playlistId, id);
    await this._service.deleteSongPlaylistById(songId, playlistId);

    return wrapper.successResponse(h, null, 'Lagu berhasil dihapus dari playlist');
  }
}

module.exports = SongPlaylistHandler;
