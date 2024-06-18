const { Bike } = require('../models/bike');

const bikeController = {
    addBike: async (req, res) => {
        const {
            bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
            rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
            minimum_rental_duration, maximum_rental_duration, bike_image_url, accessories,
            bike_specifications, bike_insurance_url, ownership_documents_url,
            maintenance_records_url, business_id
        } = req.body;

        const newBike = new Bike({
            bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
            rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
            minimum_rental_duration, maximum_rental_duration, bike_image_url, accessories,
            bike_specifications, bike_insurance_url, ownership_documents_url,
            maintenance_records_url, business_id
        });

        try {
            const savedBike = await newBike.save();
            res.status(201).json(savedBike);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add new bike' });
        }
    },

    getAllBikes: async (req, res) => {
        try {
            const bikes = await Bike.findAll();
            res.status(200).json(bikes);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bikes' });
        }
    },

    getBikeBy: async (req, res) => {
        const { column, value } = req.params;
        try {
            const bike = await Bike.findBy(column, value);
            if (bike) {
                res.status(200).json(bike);
            } else {
                res.status(404).json({ error: 'Bike not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bike' });
        }
    }
    ,
    updateBike: async (req, res) => {

        const {
            id, bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
            rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
            minimum_rental_duration, maximum_rental_duration, bike_image_url, accessories,
            bike_specifications, bike_insurance_url, ownership_documents_url,
            maintenance_records_url, business_id
        } = req.body;

        const updateFields = {
            bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
            rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
            minimum_rental_duration, maximum_rental_duration, bike_image_url, accessories,
            bike_specifications, bike_insurance_url, ownership_documents_url,
            maintenance_records_url, business_id
        };

        try {
            const updatedBike = await Bike.updateById(id, updateFields);
            if (updatedBike) {
                res.status(200).json(updatedBike);
            } else {
                res.status(404).json({ error: 'Bike not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update bike' });
        }
    }
};

module.exports = bikeController;
