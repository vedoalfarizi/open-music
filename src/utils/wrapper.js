const logger = require('./logger');

const successResponse = (h, data, message = null, code = 200) => {
  const payload = { status: 'success' };

  if (data) payload.data = data;
  if (message) payload.message = message;

  const res = h.response(payload);
  res.code(code);

  return res;
};

const errorResponse = (h, response) => {
  if (!response.statusCode) { // Server Error
    const res = h.response({
      status: 'fail',
      message: 'Maaf, terjadi kesalahan pada sistem kami',
    });
    res.code(500);

    logger('wrapper-errorResponse', response.message, 'error');

    return res;
  }

  const res = h.response({
    status: 'fail',
    message: response.message,
  });
  res.code(response.statusCode);

  return res;
};

const preResponse = (request, h) => {
  const { response } = request;

  if (response instanceof Error) {
    return errorResponse(h, response);
  }

  return response.continue || response;
};

module.exports = {
  successResponse,
  preResponse,
};
