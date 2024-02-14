const { connection } = require('./connection');

const createProductTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS services (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      label VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      cost INT NOT NULL,
      rating INT NOT NULL,
      image VARCHAR(255)
    )
  `;

  try {
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Products Table created successfully!');
    });
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

const insertProduct = (productData) => {
  const sql = `
    INSERT INTO services (name, category, cost, rating, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    productData.name,
    productData.category,
    productData.cost,
    productData.rating,
    productData.image,
  ];

  try {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        return;
      }
      console.log(`Product ${productData.name} inserted successfully!`);
    });
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM services WHERE id = ?';

    try {
      connection.query(sql, [productId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM services`;

    try {
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM services where category = ?`;

    try {
      connection.query(sql, category, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

function updateProductCostById(id, newCost) {
  const sql = `UPDATE services SET cost = ${newCost} WHERE id = ${id}`;

  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`Updated cost for product with ID ${id}`);
    });
  } catch (error) {
    console.error('Error updating product cost:', error);
  }
}

function updateCategoryTable(table_name, name, newCost) {
  const sql = `UPDATE ${table_name} SET cost = ${newCost} WHERE name = '${name}'`;

  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`Updated cost for ${table_name} with name ${name}`);
    });
  } catch (error) {
    console.error('Error updating category cost:', error);
  }
}


const productData = {
  name: 'UNIFACTOR Mens Running Shoes',
  category: 'Fashion',
  cost: 50,
  rating: 5,
  image: 'https://crio-directus-assets.s3.ap-south-1.amazonaws.com/42d4d057-8704-4174-8d74-e5e9052677c6.png',
};

// insertProduct(productData); // Uncomment to insert a product

// updateProductCostById(2, 5000); // Uncomment to update a product cost


module.exports = {
  insertProduct,
  createProductTable,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProductCostById,
  updateCategoryTable,
};
