const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postSongPlaylistHandler,
    options: {
      auth: 'openMucicApp',
    },
  },
];

module.exports = routes;
