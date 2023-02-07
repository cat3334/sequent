const mysql = require("mysql2/promise");
const config = require("./config");

async function query(sql) {
  const connection = await mysql.createConnection(config.db);
  const [result] = await connection.query(sql, (params = ""));
  return result;
}

module.exports = {
  query,
};
