const SongPlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songPlaylists',
  version: '1.0.0',
  register: async (server, {
    service, validator, songService, playlistService,
  }) => {
    const songPlaylistHandler = new SongPlaylistHandler(
      service, validator, songService, playlistService,
    );
    server.route(routes(songPlaylistHandler));
  },
};
