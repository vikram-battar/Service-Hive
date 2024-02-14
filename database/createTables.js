const { createUserTable, createServiceProviderTable } = require("./queries");
const { createOrdersTable } = require("./orders");
const { createProductTable } = require("./products");
const { createCartTable } = require("./cart");
const { createAddressesTable } = require("./address");
const { populateDatabase } = require("./services");
const createTables = () => {
  createUserTable();
  createServiceProviderTable();
  createAddressesTable();  
  createProductTable();
  createCartTable();
  createOrdersTable();
  populateDatabase();
};
createTables()
