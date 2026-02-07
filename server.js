/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const bodyParser = require("body-parser")
const app = express()
const static = require("./routes/static")
const session = require("express-session")
const pool = require('./database/')
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")


/* ***********************
 * View engine and templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout") // not at views root

/* ***********************
 * Middleware
 * ************************/
app.use(express.static("public"))

 app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))
app.use(async (req, res, next) => {
  try {
    res.locals.nav = await utilities.getNav()
    next()
  } catch (err) {
    next(err)
  }
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

/* ***********************
 * Routes
 *************************/
app.use(static)
app.get("/", baseController.buildHome)
// // File Not Found Route - must be last route in list
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)
/* ***********************
 * 404 Error Handler
 *************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})
app.use(async (err, req, res, next) => {
  console.error(err.message)

  res.status(err.status || 500).render("errors/error", {
    title: err.status || 500,
    message: err.message
  })
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
// app.use(async (err, req, res, next) => {
//   let nav = await utilities.getNav()
//   console.error(`Error at: "${req.originalUrl}": ${err.message}`)
//   res.render("errors/error", {
//     title: err.status || 'Server Error',
//     message: err.message,
//     nav
//   })
// })
// app.use(async (err, req, res, next) => {
//   console.error(`Error at "${req.originalUrl}":`, err.message)

//   let nav
//   try {
//     nav = await utilities.getNav()
//   } catch {
//     nav = ""
//   }

//   res.status(err.status || 500).render("errors/error", {
//     title: err.status || 500,
//     message: err.message,
//     nav
//   })
// })
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

// const utilities = require("./utilities/")
// app.use(utilities.buildNav)
