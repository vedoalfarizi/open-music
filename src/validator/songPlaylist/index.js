const InvariantError = require('../../exceptions/InvariantError');

const {
  postSongPlaylist,
  deleteSongPlaylist,
} = require('./schema');

const songPlaylistValidator = {
  validatePostSongPlaylist: (payload) => {
    const result = postSongPlaylist.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
  validateDeleteSongPlaylist: (payload) => {
    const result = deleteSongPlaylist.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = songPlaylistValidator;
