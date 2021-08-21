const InvariantError = require('../../exceptions/InvariantError');

const wrapper = require('../../utils/wrapper');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const {
      title, year, performer, genre, duration,
    } = request.payload;

    if (year > new Date().getFullYear()) throw new InvariantError(`Tahun ${year} tidak valid`);

    const songId = await this._service.addSong({
      title, year, performer, genre, duration,
    });

    return wrapper.sendResponse(h, 'success', { songId }, 'Lagu berhasil ditambahkan', 201);
  }
}

module.exports = SongHandler;
