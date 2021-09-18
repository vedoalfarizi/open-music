const wrapper = require('../../utils/wrapper');

class PlaylistHandler {
  constructor(service, validator, collaborationService) {
    this._service = service;
    this._validator = validator;
    this._collaborationService = collaborationService;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistHandler = this.getPlaylistHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
  }

  async postPlaylistHandler({ auth, payload }, h) {
    this._validator.validatePostPlaylist(payload);

    const { id } = auth.credentials;

    const playlistId = await this._service.addPlaylist({ ...payload, id });
    return wrapper.successResponse(h, { playlistId }, 'Playlist berhasil ditambahkan', 201);
  }

  async getPlaylistHandler({ auth: { credentials } }, h) {
    const { id } = credentials;

    const ownPlaylists = await this._service.getUserPlaylist(id);
    const collabsPlaylist = await this._collaborationService.getCollabotarorPlaylist(id);

    const playlists = [...ownPlaylists, ...collabsPlaylist];
    return wrapper.successResponse(h, { playlists });
  }

  async deletePlaylistHandler({ auth: { credentials }, params }, h) {
    const { id } = credentials;
    const { playlistId } = params;

    await this._service.verifyPlaylistOwner(playlistId, id);
    await this._service.deletePlaylistById(playlistId);

    return wrapper.successResponse(h, null, 'Playlist berhasil dihapus');
  }
}

module.exports = PlaylistHandler;
