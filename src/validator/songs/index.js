const InvariantError = require('../../exceptions/InvariantError');

const { songPayloadSchema } = require('./schema');

const songValidator = {
  validateSongPayload: (payload) => {
    const result = songPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = songValidator;
