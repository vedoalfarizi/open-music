const logger = require('./logger');

const sendResponse = (h, status, result, message = '', code = 200) => {
  if (status === 'fail') {
    const res = h.response({
      status,
      message: result.statusCode ? result.message : 'Maaf, terjadi kesalahan di sistem kami',
    });
    res.code(result.statusCode || 500);

    if (!result.statusCode) logger('send-response', result.message, 'error');

    return res;
  }

  const res = h.response({
    status,
    data: result,
    message,
  });
  res.code(code);

  return res;
};

const preResponse = (request, h) => {
  const { response } = request;

  if (response instanceof Error) {
    return sendResponse(h, 'fail', response);
  }

  return response.continue || response;
};

module.exports = {
  sendResponse,
  preResponse,
};
