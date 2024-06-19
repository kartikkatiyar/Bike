// import { BusinessDataValidator } from "../helper/businessDataValidator";
const {BusinessDataValidator} = require("../helper/businessDataValidator");
const {Business} = require("../models/business");

const addBusiness = async (req, res) => {
  const { business_name, business_address, business_registration_number, PAN, GST } = req.body;
  const userId = 3;
  const { isInputValid, msg} =
   await BusinessDataValidator.validateBusinessData({
      business_name,
      business_address,
      business_registration_number,
      PAN,
      GST,
      userId
    }); 

  if (isInputValid) {
    return res.status(400).json({ message: msg });
  }

  const business = new Business({
    business_name,
    business_address,
    business_registration_number,
    PAN,
    GST,
    userId,
  });
  try {
    await business.save();
    return res.status(200).json({ msg: "Business added successfully!" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ msg: error.message || "Internal server error" });
    throw error;
  }
};

const addAdditionalInfo = async (req, res) => {
  const { id, image_url, business_account_number } = req.body;

  try {

    const business = await Business.addAdditionalInfo(id, image_url, business_account_number);
    if (!business) {
      return res.status(404).json({ msg: "Business not found" });
    }
    res.status(200).json({ msg: "Business additional info added successfully!" });
  }catch(error) {
    console.error("Error executing query:", error);
    res.status(500).json({ msg: error.message || "Internal server error" });
    throw error;
  }
}

module.exports = { addBusiness, addAdditionalInfo };