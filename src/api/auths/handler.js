const wrapper = require('../../utils/wrapper');

class AuthHandler {
  constructor(authService, userService, tokenManager, validator) {
    this._authService = authService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthHandler = this.postAuthHandler.bind(this);
    this.putAuthHandler = this.putAuthHandler.bind(this);
    this.deleteAuthHandler = this.deleteAuthHandler.bind(this);
  }

  async postAuthHandler({ payload }, h) {
    this._validator.validatePostAuthPayload(payload);

    const userId = await this._userService.verifyUserCredential(payload);
    const accessToken = this._tokenManager.generateAccessToken({ userId });
    const refreshToken = this._tokenManager.generateRefreshToken({ userId });

    await this._authService.addRefreshToken(refreshToken);

    return wrapper.successResponse(h, { accessToken, refreshToken }, 'Authentication berhasil ditambahkan', 201);
  }

  async putAuthHandler({ payload }, h) {
    this._validator.validatePutAuthPayload(payload);

    const { refreshToken } = payload;
    await this._authService.verifyRefreshToken(refreshToken);
    const { userId } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ userId });

    return wrapper.successResponse(h, { accessToken }, 'Authentication berhasil diperbarui');
  }

  async deleteAuthHandler({ payload }, h) {
    this._validator.validateDeleteAuthPayload(payload);

    const { refreshToken } = payload;
    await this._authService.deleteRefreshToken(refreshToken);

    return wrapper.successResponse(h, null, 'Refresh token berhasil dihapus');
  }
}

module.exports = AuthHandler;
