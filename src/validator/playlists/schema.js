const joi = require('joi');

const postPlaylist = joi.object({
  name: joi.string().min(1).max(255).required(),
});

module.exports = {
  postPlaylist,
};
