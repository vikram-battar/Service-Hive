const { connection } = require('./connection');

const createAddressesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS addresses (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      address VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL
    )
  `;

  try {
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Addresses Table created successfully!');
    });
  } catch (error) {
    console.error('Error creating table:', error);
  }
};


const insertAddress = (address, username) => {
  const sql = 'INSERT INTO addresses (address, username) VALUES (?, ?)';
  const values = [address, username];

  return new Promise((resolve, reject) => {
    try {
      connection.query(sql, values, (err, result) => {
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

const deleteAddressById = (id) => {
  const sql = 'DELETE FROM addresses WHERE id = ?';
  return new Promise((resolve, reject) => {
    try {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAddressesByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM addresses WHERE username = ?';
    try {
      connection.query(sql, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAddressesById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM addresses WHERE id = ?';
    try {
      connection.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createAddressesTable,
  deleteAddressById,
  insertAddress,
  getAddressesByUsername,
  getAddressesById,
};
