const InvariantError = require('../../exceptions/InvariantError');
const { imageHeadersSchema } = require('./schema');

const uploadsValidator = {
  validateImageHeaders: (headers) => {
    const result = imageHeadersSchema.validate(headers);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = uploadsValidator;
