const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}
baseController.triggerError = async function (req, res, next) {
  try {
    throw new Error("Intentional server error for testing")
  } catch (err) {
    next(err)
  }
}
module.exports = baseController

// const baseController = {}

// baseController.buildHome = async function (req, res) {
//   req.flash("notice", "This is a flash message.")
//   res.render("index", { title: "Home" })
// }

// module.exports = baseController