const wrapper = require('../../utils/wrapper');

class UserHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler({ payload }, h) {
    this._validator.validateUserPayload(payload);

    const userId = await this._service.addUser(payload);

    return wrapper.successResponse(h, { userId }, 'User berhasil ditambahkan', 201);
  }
}

module.exports = UserHandler;
