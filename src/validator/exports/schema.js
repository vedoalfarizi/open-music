const joi = require('joi');

const postExportPlaylist = joi.object({
  targetEmail: joi.string().email().required(),
});

module.exports = {
  postExportPlaylist,
};
