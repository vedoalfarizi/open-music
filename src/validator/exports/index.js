const InvariantError = require('../../exceptions/InvariantError');

const {
  postExportPlaylist,
} = require('./schema');

const exportValidator = {
  validatePostExportPlaylist: (payload) => {
    const result = postExportPlaylist.validate(payload);
    if (result.error) throw new InvariantError(result.error.message.replace(/"/g, ''));
  },
};

module.exports = exportValidator;
