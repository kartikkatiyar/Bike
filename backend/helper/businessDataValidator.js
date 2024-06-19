const {Business} = require("../models/business");


class BusinessDataValidator {
    static async validateBusinessData(businessData) {
        const { business_name, business_address, business_registration_number, PAN, GST } = businessData;
        if (!business_name || !business_address || !business_registration_number || !PAN || !GST) {
            return {
                isInputValid: true,
                msg: "All fields are required",
            }
        }

        let business = await Business.findBy("business_registration_number", business_registration_number);
        if (business) {
            return {
                isInputValid: true,
                msg: "Business with same registration number already exists",
            }
        }

        business = await Business.findBy("business_name", business_name);
        if (business) {
            return {
                isInputValid: true,
                msg: "Business with same name already exists",
            }
        }
        
        return {
            isInputValid: false,
        }
    }
}
module.exports = { BusinessDataValidator }