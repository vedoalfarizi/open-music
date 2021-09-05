const InvariantError = require('../../exceptions/InvariantError');

const { userPayloadSchema } = require('./schema');

const userValidator = {
  validateUserPayload: (payload) => {
    const result = userPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = userValidator;
