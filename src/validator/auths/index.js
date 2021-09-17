const InvariantError = require('../../exceptions/InvariantError');

const {
  postAuthPayloadSchema,
  putAuthPayloadSchema,
  deleteAuthPayloadSchema,
} = require('./schema');

const authValidator = {
  validatePostAuthPayload: (payload) => {
    const result = postAuthPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
  validatePutAuthPayload: (payload) => {
    const result = putAuthPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
  validateDeleteAuthPayload: (payload) => {
    const result = deleteAuthPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = authValidator;
