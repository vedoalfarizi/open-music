exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'varchar(24)',
      primaryKey: true,
    },
    username: {
      type: 'varchar(24)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'varchar(255)',
      notNull: true,
    },
    fullname: {
      type: 'varchar(124)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
