const { body, validationResult } = require("express-validator")
const utilities = require("./index")

const invValidate = {}

/* ***************************
 * Classification Validation Rules
 * ************************** */
invValidate.classificationRules = () => [
  body("classification_name")
    .trim()
    .notEmpty()
    .withMessage("Classification name is required.")
    .isAlphanumeric()
    .withMessage("No spaces or special characters allowed.")
]

/* ***************************
 * Inventory Validation Rules
 * ************************** */
invValidate.inventoryRules = () => [
  body("inv_make")
    .trim()
    .notEmpty()
    .withMessage("Make is required."),
  body("inv_model")
    .trim()
    .notEmpty()
    .withMessage("Model is required."),
  body("inv_year")
    .isInt({ min: 1900 })
    .withMessage("Enter a valid year."),
  body("inv_price")
    .isFloat()
    .withMessage("Enter a valid price."),
  body("inv_miles")
    .isInt({ min: 0 })
    .withMessage("Enter valid mileage."),
  body("inv_color")
    .trim()
    .notEmpty()
    .withMessage("Color is required."),
  body("classification_id")
    .isInt()
    .withMessage("Classification is required.")
]

/* ***************************
 * Check Classification Data
 * ************************** */
invValidate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      errors: errors.array()
    })
  }
  next()
}

/* ***************************
 * Check Inventory Data
 * ************************** */
invValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const classificationList =
      await utilities.buildClassificationList(req.body.classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      errors: errors.array(),
      ...req.body
    })
  }
  next()
}

module.exports = invValidate