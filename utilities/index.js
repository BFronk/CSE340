const invModel = require("../models/inventory-model")

const utilities = {}

// /* ************************
//  * Constructs the nav HTML unordered list
//  ************************** */
// utilities.getNav = async function (req, res, next) {
//   let data = await invModel.getInventoryByClassificationId
//   let list = "<ul>"
//   list += '<li><a href="/" title="Home page">Home</a></li>'
//   data.rows.forEach((row) => {
//     list += "<li>"
//     list +=
//       '<a href="/inv/type/' +
//       row.classification_id +
//       '" title="See our inventory of ' +
//       row.classification_name +
//       ' vehicles">' +
//       row.classification_name +
//       "</a>"
//     list += "</li>"
//   })
//   list += "</ul>"
//   return list
// }

utilities.getNav = async function () {
  const data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  //   let data = await invModel.getInventoryByClassificationId
  // let list = "<ul>"
  // list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
utilities.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail.replace('/images/', '/images/vehicles/') 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}
utilities.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications()
  let list =
    '<select name="classification_id" id="classificationList" required>'
  list += "<option value=''>Choose a Classification</option>"

  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"`
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      list += " selected"
    }
    list += `>${row.classification_name}</option>`
  })

  list += "</select>"
  return list
}

// Build the vehicle detail HTML
utilities.buildVehicleDetail = function (vehicle) {
  return `
  <section class="vehicle-detail">
    <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
    <div>
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p><strong>Price:</strong> ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(vehicle.inv_price)}</p>
      <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString("en-US")} miles</p>
      <p>${vehicle.inv_description}</p>
    </div>
  </section>
  `
}
 

utilities.buildAccountLoginGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<form id="loginForm" action="login.html" class="joinPage">'
    grid += '<label for="account_email">  email:'
    grid +=       '<input type="text" id="account_email" name="firstName" required>'
    grid +=       '</label>'
    grid +=       ''
    grid +=       ''
    grid +=       '<label for="password">password:</label>'
    grid +=       '<input type="text" id="password" name="password" required>'
    grid +=       ''
    grid +='</form>'
  }
}
utilities.buildLogin = async function(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
        errors: null,
    })
}

utilities.handleErrors = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
module.exports = utilities


