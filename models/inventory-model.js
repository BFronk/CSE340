const pool = require("../database/")


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}
async function getVehicleById(invId) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1"
    const result = await pool.query(sql, [invId])
    return result.rows[0]
  } catch (error) {
    throw error
  }
}
async function addClassification(classification_name) {
  const sql =
    "INSERT INTO classification (classification_name) VALUES ($1)"
  return pool.query(sql, [classification_name])
}

/* ***************************
 * Add new inventory item
 * ************************** */
async function addInventory(data) {
  try {
    const sql = `
      INSERT INTO inventory (
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `
    const result = await pool.query(sql, [
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color,
      data.classification_id
    ])
    return result
  } catch (error) {
    return error
  }
}
module.exports = {getClassifications, getInventoryByClassificationId, getVehicleById, addClassification, addInventory}
// async function getClassifications(){
//   return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
// }

// async function getVehiclesByClassification(classId) {
//   const sql = "SELECT * FROM inventory WHERE classification_id = $1"
//   const result = await pool.query(sql, [classId])
//   return result.rows
// }

// module.exports = {
//   getVehicleById,
//   getClassifications,
//   getVehiclesByClassification,
//   // …keep existing exports
// }


// /* ***************************
//  assignment functions
//  * ************************** */
// async function getInventoryByClassificationId(classification_id) {
//   try {
//     const data = await pool.query(
//       `SELECT * FROM public.inventory AS i 
//       JOIN public.classification AS c 
//       ON i.classification_id = c.classification_id 
//       WHERE i.classification_id = $1`,
//       [classification_id]
//     )
//     return data.rows
//   } catch (error) {
//     console.error("getclassificationsbyid error " + error)
//   }
// }
// module.exports = {getInventoryByClassificationId};
