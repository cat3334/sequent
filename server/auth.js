const bcrypt = require("bcrypt");

const saltRounds = 10;
const password = "Admin@123";

exports.hashPassword = async (password) => {
  try {
    const hashed = bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (e) {
    console.error(e);
  }
};

exports.validatePassword = async (plainText, storedHash) => {
  const isValid = await bcrypt.compare(plainText, storedHash);
  return isValid;
};
