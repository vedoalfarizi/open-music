const joi = require('joi');

const postCollaboration = joi.object({
  playlistId: joi.string().max(32).required(),
  userId: joi.string().max(24).required(),
});

const deleteCollaboration = joi.object({
  playlistId: joi.string().max(32).required(),
  userId: joi.string().max(24).required(),
});

module.exports = {
  postCollaboration,
  deleteCollaboration,
};
