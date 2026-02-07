const invModel = require("../models/inventory-model")
const utilities = require("../utilities")
const invCont = {}
/* ***************************
 * Build add-classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res) {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    errors: null
  })
}

/* ***************************
 * Build add-inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res) {
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    errors: null,
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_price: "",
    inv_miles: "",
    inv_color: ""
  })
}
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  // const className = data[0].classification_name
  const className = data.length > 0
  ? data[0].classification_name
  : "Vehicles"
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}  
/* ***************************
 *  Build vehicle detail view
 * *************************** */
invCont.buildDetailView = async function (req, res, next) {
  try {
    const invId = req.params.invId
    const vehicle = await invModel.getVehicleById(invId)
    const data = await invModel.getInventoryByClassificationId(vehicle.classification_id)
    const vehicleHTML = utilities.buildVehicleDetail(vehicle)
    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      content: vehicleHTML,
      nav,
      vehicles: data,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

// Build inventory management view
invCont.buildManagement = async function (req, res) {
  res.render("inventory/management", {
    title: "Inventory Management"
  })
}

invCont.addInventory = async function (req, res) {
  const result = await invModel.addInventory(req.body)

  if (result) {
    req.flash("notice", "Inventory item added successfully.")
    res.redirect("/inv/")
  } else {
    const classificationList =
      await utilities.buildClassificationList(req.body.classification_id)

    req.flash("notice", "Failed to add inventory.")
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      ...req.body
    })
  }
}
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)

  if (result) {
    req.flash("notice", "Classification added successfully.")
    return res.redirect("/inv/")
  }

  req.flash("notice", "Failed to add classification.")
  res.render("inventory/add-classification", {
    title: "Add Classification"
  })
}


module.exports = invCont