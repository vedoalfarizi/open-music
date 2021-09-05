const InvariantError = require('../../exceptions/InvariantError');

const { postAuthPayloadSchema } = require('./schema');

const authValidator = {
  validatePostAuthPayload: (payload) => {
    const result = postAuthPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = authValidator;
