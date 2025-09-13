const crypto = require("crypto");

const generateHash = (data) => {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
};

module.exports = { generateHash };