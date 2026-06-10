const db = require("../../db");

class UserRepository {
  static async findUserByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM Admin WHERE email = ?",
      [email]
    );

    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = UserRepository;  