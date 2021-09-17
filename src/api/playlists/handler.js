const AuthorizationError = require('../../exceptions/AuthorizationError');
const wrapper = require('../../utils/wrapper');

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistHandler = this.getPlaylistHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
  }

  async postPlaylistHandler({ auth, payload }, h) {
    this._validator.validatePostPlaylist(payload);

    const { id: owner } = auth.credentials;

    const playlistId = await this._service.addPlaylist({ ...payload, owner });
    return wrapper.successResponse(h, { playlistId }, 'Playlist berhasil ditambahkan', 201);
  }

  async getPlaylistHandler({ auth: { credentials } }, h) {
    const { id } = credentials;

    const playlists = await this._service.getUserPlaylist(id);
    return wrapper.successResponse(h, { playlists });
  }

  async deletePlaylistHandler({ auth: { credentials }, params }, h) {
    const { id } = credentials;
    const { playlistId } = params;

    const playlist = await this._service.getPlaylistById(playlistId);
    if (playlist.owner !== id) throw new AuthorizationError('Anda tidak berhak mengakses resource ini');

    await this._service.deletePlaylistById(playlistId);

    return wrapper.successResponse(h, null, 'Playlist berhasil dihapus');
  }
}

module.exports = PlaylistHandler;
