const InvariantError = require('../../exceptions/InvariantError');

const {
  postCollaboration,
  deleteCollaboration,
} = require('./schema');

const collaborationValidator = {
  validatePostCollaboration: (payload) => {
    const result = postCollaboration.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
  validateDeleteCollaboration: (payload) => {
    const result = deleteCollaboration.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = collaborationValidator;
