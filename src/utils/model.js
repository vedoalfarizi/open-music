const songModel = ({
  inserted_at,
  updated_at,
  ...args
}) => ({
  ...args,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

const songPlaylistModel = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

module.exports = {
  songModel,
  songPlaylistModel,
};
