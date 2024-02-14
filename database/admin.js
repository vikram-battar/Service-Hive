const { connection } = require('./connection');

const getTopCategories = async (startDate, endDate) => {
    const sql = `
      SELECT category as name, SUM(price * quantity) AS total_order_price
      FROM orders
      
      GROUP BY category
      ORDER BY total_order_price DESC
      LIMIT 5
    `;
  
    try {
      const result = await get(sql, []);
      console.log('Data fetched successfully!');
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
  };
  
  
  
const getTopServices = async()=>{    
    const sql = `
      SELECT label as name, SUM(price * quantity) AS total_order_price
      FROM orders
      
      GROUP BY label
      ORDER BY total_order_price DESC
      LIMIT 5
    `;
  
    try {
      const result = await get(sql, []);
      console.log('Data fetched successfully!');
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }
}
const getTopUsers = async()=>{  
    const sql = `
      SELECT username as name, SUM(price * quantity) AS total_order_price
      FROM orders
      
      GROUP BY username
      ORDER BY total_order_price DESC
      LIMIT 5
    `;
  
    try {
      const result = await get(sql, []);
      console.log('Data fetched successfully!');
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }  
}
const getMostOrderedServices = async()=>{  
    const sql = `
      SELECT label as name, SUM(quantity) AS count
      FROM orders
      
      GROUP BY label
      ORDER BY count DESC
      LIMIT 5
    `;
  
    try {
      const result = await get(sql, []);
      console.log('Data fetched successfully!');
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err;
    }  
}
const get = (query, params) => {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  
module.exports={getTopCategories, getTopServices, getTopUsers, getMostOrderedServices}