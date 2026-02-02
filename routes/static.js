const express = require('express');
const router = express.Router();
const baseController = require("../controllers/baseController")

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));
// routes/baseRoute.js OR a new error route file
router.get("/trigger-error", baseController.triggerError)
module.exports = router;


// const express = require("express")
// const router = express.Router()
// const path = require("path")

// // Serve static files from /public
// router.use(express.static(path.join(__dirname, "../public")))
// module.exports = router
