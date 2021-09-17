const InvariantError = require('../../exceptions/InvariantError');

const {
  postPlaylist,
} = require('./schema');

const playlistValidator = {
  validatePostPlaylist: (payload) => {
    const result = postPlaylist.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = playlistValidator;
