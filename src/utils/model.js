const songModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
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
