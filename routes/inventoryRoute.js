const express = require("express")
const router = new express.Router()
const inventoryController = require("../controllers/invController.js")
const invValidate = require("../utilities/inventory-validation")

router.get("/type/:classificationId", inventoryController.buildByClassificationId);

// Vehicle detail page
router.get("/detail/:invId", inventoryController.buildDetailView)
router.get("/", inventoryController.buildManagement)


router.get("/add-classification", inventoryController.buildAddClassification)
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  inventoryController.addClassification
)

router.get("/add-inventory", inventoryController.buildAddInventory)
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  inventoryController.addInventory
)
module.exports = router

