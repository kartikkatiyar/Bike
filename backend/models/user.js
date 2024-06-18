const { pool } = require("../config/db");

class User {
  constructor({ fullName, email, password, phone }) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  async save() {
    const query = `
      INSERT INTO "User" (full_name, email, password, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    try {
      const { rows } = await pool.query(query, [
        this.fullName,
        this.email,
        this.password,
        this.phone,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  static async findAll() {
    const query = `SELECT * FROM "User"`;
    try {
      const { rows } = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  static async findBy(column, value) {
    const query = `SELECT * FROM "User" WHERE ${column} = $1`;
    try {
      const { rows } = await pool.query(query, [value]);
      return rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
}

module.exports = { User };
