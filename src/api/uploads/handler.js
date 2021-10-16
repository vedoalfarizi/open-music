const wrapper = require('../../utils/wrapper');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    const pictureUrl = await this._service.writeFile(data, data.hapi);

    return wrapper.successResponse(h, { pictureUrl }, 'Gambar berhasil diunggah', 201);
  }
}

module.exports = UploadsHandler;
