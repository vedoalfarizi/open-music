const joi = require('joi');

const postSongPlaylist = joi.object({
  songId: joi.string().max(24).required(),
});

module.exports = {
  postSongPlaylist,
};
