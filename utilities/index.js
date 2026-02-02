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
 
module.exports = utilities


