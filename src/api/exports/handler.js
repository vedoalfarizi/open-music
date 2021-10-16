const wrapper = require('../../utils/wrapper');

class ExportHandler {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._palylistService = playlistService;
    this._validator = validator;

    this.postExportPlaylistSongsHandler = this.postExportPlaylistSongsHandler.bind(this);
  }

  async postExportPlaylistSongsHandler({ auth: { credentials }, payload, params }, h) {
    this._validator.validatePostExportPlaylist(payload);

    const { playlistId } = params;
    await this._palylistService.verifyPlaylistUserAccess(playlistId, credentials.id);

    const message = {
      songPlaylistId: playlistId,
      targetEmail: payload.targetEmail,
    };
    await this._service.sendMessage('export:playlistSongs', JSON.stringify(message));

    return wrapper.successResponse(h, null, 'Permintaan Anda sedang kami proses', 201);
  }
}

module.exports = ExportHandler;
