const { pool } = require("../config/db");

class Bike {
    constructor({
        bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
        rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
        minimum_rental_duration, maximum_rental_duration, bike_image_url, accessories,
        bike_specifications, bike_insurance_url, ownership_documents_url,
        maintenance_records_url, business_id
    }) {
        this.bike_brand = bike_brand;
        this.bike_model = bike_model;
        this.bike_category = bike_category;
        this.year_of_manufacture = year_of_manufacture;
        this.bike_condition = bike_condition;
        this.rental_price_daily = rental_price_daily;
        this.rental_price_weekly = rental_price_weekly;
        this.rental_price_monthly = rental_price_monthly;
        this.availability_schedule = availability_schedule;
        this.minimum_rental_duration = minimum_rental_duration;
        this.maximum_rental_duration = maximum_rental_duration;
        this.bike_image_url = bike_image_url;
        this.accessories = accessories;
        this.bike_specifications = bike_specifications;
        this.bike_insurance_url = bike_insurance_url;
        this.ownership_documents_url = ownership_documents_url;
        this.maintenance_records_url = maintenance_records_url;
        this.business_id = business_id;
    }

    async save() {
        const query = `
      INSERT INTO bike (
        bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
        rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
        minimum_rental_duration, maximum_rental_duration, bike_image_url, accessories,
        bike_specifications, bike_insurance_url, ownership_documents_url,
        maintenance_records_url, business_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      ) RETURNING *;
    `;
        try {
            const { rows } = await pool.query(query, [
                this.bike_brand, this.bike_model, this.bike_category, this.year_of_manufacture,
                this.bike_condition, this.rental_price_daily, this.rental_price_weekly, this.rental_price_monthly,
                this.availability_schedule, this.minimum_rental_duration, this.maximum_rental_duration,
                this.bike_image_url, this.accessories, this.bike_specifications, this.bike_insurance_url,
                this.ownership_documents_url, this.maintenance_records_url, this.business_id
            ]);
            return rows[0];
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }

    static async findAll() {
        const query = `SELECT * FROM bike`;
        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }

    static async findBy(column, value) {
        const query = `SELECT * FROM bike WHERE ${column} = $1`;
        try {
            const { rows } = await pool.query(query, [value]);
            return rows[0];
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }

    static async updateById(id, updateFields) {
        const setClause = Object.keys(updateFields)
            .map((key, index) => `"${key}" = $${index + 1}`)
            .join(", ");
        const values = Object.values(updateFields);

        const query = `
      UPDATE bike
      SET ${setClause}
      WHERE id = $${values.length + 1}
      RETURNING *;
    `;

        try {
            const { rows } = await pool.query(query, [...values, id]);
            return rows[0];
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }

    
}

module.exports = { Bike };
