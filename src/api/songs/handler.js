const wrapper = require('../../utils/wrapper');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler({ payload }, h) {
    this._validator.validateSongPayload(payload);

    const songId = await this._service.addSong(payload);

    return wrapper.successResponse(h, { songId }, 'Lagu berhasil ditambahkan', 201);
  }

  async getSongsHandler(_, h) {
    const songs = await this._service.getSongs();

    return wrapper.successResponse(h, { songs });
  }

  async getSongByIdHandler({ payload, params }, h) {
    const { songId } = params;

    const song = await this._service.getSongById(songId, payload);

    return wrapper.successResponse(h, { song });
  }

  async putSongByIdHandler({ payload, params }, h) {
    this._validator.validateSongPayload(payload);

    const { songId } = params;
    await this._service.editSongById(songId, payload);

    return wrapper.successResponse(h, null, 'lagu berhasil diperbarui');
  }

  async deleteSongByIdHandler({ params }, h) {
    const { songId } = params;

    await this._service.deleteSongById(songId);

    return wrapper.successResponse(h, null, 'lagu berhasil dihapus');
  }
}

module.exports = SongHandler;
