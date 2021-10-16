const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportPlaylistSongsHandler,
    options: {
      auth: 'openMucicApp',
    },
  },
];

module.exports = routes;
