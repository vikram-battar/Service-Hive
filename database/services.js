const fs = require('fs');
const { connection } = require('./connection');

const serviceData =[
  {
    label:"Make Up",
    name: 'makeup',
    category: 'women_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Nail Extensions",
    name: 'nail_extensions',
    category: 'women_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Threading",
    name: 'threading',
    category: 'women_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Facial",
    name: 'women_facial',
    category: 'women_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Hair Styling",
    name: 'women_hairstyling',
    category: 'women_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Beard Grooming",
    name: 'beard_grooming',
    category: 'men_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Haircut Combo",
    name: 'haircutbeardcombo',
    category: 'men_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Haircut",
    name: 'men_haircut',
    category: 'men_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Hair Styling",
    name: 'men_hairstyling',
    category: 'men_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Spa",
    name: 'spa',
    category: 'men_salon',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"AC Repair",
    name: 'ac_repair',
    category: 'electrician',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Washing Machine Repair",
    name: 'washing_machine_repair',
    category: 'electrician',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Phone Repair",
    name: 'phone_repair',
    category: 'electrician',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Termite Control",
    name: 'termite',
    category: 'cleaning',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Bathroom Cleaning",
    name: 'bathroom_cleaning',
    category: 'cleaning',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Carpet Cleaning",
    name: 'carpets_cleaning',
    category: 'cleaning',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Kitchen Cleaning",
    name: 'kitchen_cleaning',
    category: 'cleaning',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Chair Making",
    name: 'chair_making',
    category: 'carpenter',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Dining Table Making",
    name: 'dining_table_making',
    category: 'carpenter',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Door Making",
    name: 'door_making',
    category: 'carpenter',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Sofa Making",
    name: 'sofa_making',
    category: 'carpenter',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  },
  {
    label:"Table Making",
    name: 'table_making',
    category: 'carpenter',
    cost: Math.round(Math.random()*500),
    rating: Math.round(Math.random()*5),   
  }

]

const insertProduct = (productData) => {
  try {
    const sql = `
      INSERT INTO services (label, name, category, cost, rating, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      productData.label,
      productData.name,
      productData.category,
      productData.cost,
      productData.rating,
      productData.image,
    ];

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

function createNewTableByCategory(table_name, category) {
  try {
    const newTableName = table_name;

    // Create new table query
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${newTableName} (
      id INT NOT NULL AUTO_INCREMENT,
      item_no INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      cost INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (item_no) REFERENCES services(id)
    )`;

    connection.query(createTableQuery, (error, results, fields) => {
      if (error) {
        console.log(`Error creating new table: ${error}`);
        return;
      }

      console.log(`New table ${newTableName} created successfully.`);
    });

    let insertQuery = ` INSERT INTO ${newTableName} (name, cost, item_no)
    SELECT name, cost, id FROM services WHERE category = '${category}';`;

    connection.query(insertQuery, (error, results, fields) => {
      if (error) {
        console.log(`Error inserting into the table: ${error}`);
        return;
      }

      console.log(`Inserted into ${newTableName}`);
    });
  } catch (error) {
    console.error('Error creating or inserting into a new table:', error);
  }
}

const populateDatabase = () => {
  try {
    serviceData.forEach((service) => {
      insertProduct(service);
    });

    const distinctCategories = [...new Set(serviceData.map((item) => item.category))];

    distinctCategories.forEach((category) => {
      createNewTableByCategory(category, category);
    });
  } catch (error) {
    console.error('Error populating the database:', error);
  }
};

module.exports = {populateDatabase}
