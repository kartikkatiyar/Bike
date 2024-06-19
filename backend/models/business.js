const { pool } = require("../config/db");

class Business {
  constructor({
    business_name,
    business_address,
    business_registration_number,
    PAN,
    GST,
    userId,
  }) {
    this.business_name = business_name;
    this.business_address = business_address;
    this.business_registration_number = business_registration_number;
    this.PAN = PAN;
    this.GST = GST;
    this.userId = userId;
  }


  async save() {
    const query = `
            INSERT INTO "business" (business_name, business_address, business_registration_number, "PAN", "GST", "userId", "image_url", "business_account_number")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
    try {
      const { rows } = await pool.query(query, [
        this.business_name,
        this.business_address,
        this.business_registration_number,
        this.PAN,
        this.GST,
        this.userId,
        "",
        "",
      ]);

      return rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  static async addAdditionalInfo(id, image_url, business_account_number) {
    const query = `
            UPDATE "business"
            SET image_url = $1, business_account_number = $2
            WHERE id = $3
            RETURNING *
        `;
    try {
      const { rows } = await pool.query(query, [
        image_url,
        business_account_number,
        id,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  static async findBy(column, value) {
    const query = `SELECT * FROM "business" WHERE ${column} = $1`;
    try {
      const { rows } = await pool.query(query, [value]);
      return rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

}
module.exports = { Business };
