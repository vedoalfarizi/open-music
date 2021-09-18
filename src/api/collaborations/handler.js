const wrapper = require('../../utils/wrapper');

class Collaborations {
  constructor(service, validator, playlistService) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistService;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler({ auth: { credentials }, payload }, h) {
    await this._validator.validatePostCollaboration(payload);

    const { id: owner } = credentials;
    const { playlistId } = payload;

    await this._playlistService.verifyPlaylistOwner(playlistId, owner);
    const collaborationId = await this._service.addCollaborator(payload);

    return wrapper.successResponse(h, { collaborationId }, 'Lagu berhasil ditambahkan ke playlist', 201);
  }

  async deleteCollaborationHandler({ auth: { credentials }, payload }, h) {
    await this._validator.validateDeleteCollaboration(payload);

    const { id: owner } = credentials;
    const { playlistId } = payload;

    await this._playlistService.verifyPlaylistOwner(playlistId, owner);
    await this._service.deleteCollaborator(payload);

    return wrapper.successResponse(h, null, 'Kolaborasi berhasil dihapus');
  }
}

module.exports = Collaborations;
