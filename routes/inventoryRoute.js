const express = require("express")
const router = new express.Router()
const inventoryController = require("../controllers/invController.js")

router.get("/type/:classificationId", inventoryController.buildByClassificationId);

// Vehicle detail page
router.get("/detail/:invId", inventoryController.buildDetailView)

module.exports = router