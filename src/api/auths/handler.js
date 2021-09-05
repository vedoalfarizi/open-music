const wrapper = require('../../utils/wrapper');

class AuthHandler {
  constructor(authService, userService, tokenManager, validator) {
    this._authService = authService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthHandler = this.postAuthHandler.bind(this);
  }

  async postAuthHandler({ payload }, h) {
    this._validator.validatePostAuthPayload(payload);

    const userId = await this._userService.verifyUserCredential(payload);
    const accessToken = this._tokenManager.generateAccessToken({ userId });
    const refreshToken = this._tokenManager.generateRefreshToken({ userId });

    await this._authService.addRefreshToken(refreshToken);

    return wrapper.successResponse(h, { accessToken, refreshToken }, 'Authentication berhasil ditambahkan', 201);
  }
}

module.exports = AuthHandler;
