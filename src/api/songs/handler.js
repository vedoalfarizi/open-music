const wrapper = require('../../utils/wrapper');

const { validateYear } = require('../../utils/common');

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

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { year } = request.payload;
    await validateYear(year);

    const songId = await this._service.addSong(request.payload);

    return wrapper.successResponse(h, { songId }, 'Lagu berhasil ditambahkan', 201);
  }

  async getSongsHandler(request, h) {
    const songs = await this._service.getSongs();

    return wrapper.successResponse(h, { songs });
  }

  async getSongByIdHandler(request, h) {
    const { songId } = request.params;

    const song = await this._service.getSongById(songId, request.payload);

    return wrapper.successResponse(h, { song });
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { year } = request.payload;
    await validateYear(year);

    const { songId } = request.params;
    await this._service.editSongById(songId, request.payload);

    return wrapper.successResponse(h, null, 'lagu berhasil diperbarui');
  }

  async deleteSongByIdHandler(request, h) {
    const { songId } = request.params;

    await this._service.deleteSongById(songId);

    return wrapper.successResponse(h, null, 'lagu berhasil dihapus');
  }
}

module.exports = SongHandler;
