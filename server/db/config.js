const config = {
  db: {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  },
  listPerPage: 10,
};
module.exports = config;
