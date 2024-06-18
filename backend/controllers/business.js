const { Validator } = require("../helper/validator");

const createAboutBusiness = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const { businessName, businessAddress, businessRegNo, pan, gst } = req.body;

  const { isInputValid, msg: inputValidationErrorMsg } = Validator.inputValidation({
    businessName,
    businessAddress,
    businessRegNo,
    pan,
    gst,
  });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationErrorMsg });
  }
  const userId = req.id;

};
