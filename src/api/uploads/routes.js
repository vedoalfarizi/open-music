const { ONE_KB } = require('../../utils/constans');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500 * ONE_KB,
      },
    },
  },
];

module.exports = routes;
