const { SQLDataSource } = require("datasource-sql");

class CustomerDB extends SQLDataSource {
  constructor({ config, cache, contextValue }) {
    super(config);
    super.initialize({
      context: contextValue,
      cache
    });
  }

  async getCustomers() {
    console.log("In Get Customer(s)");
    return this.knex.select('*').from('customers');
  };

  async getCustomer(id) {
    console.log("In Get Customer");
    const cusId = 1;
    return this.knex.select('*').from('customers').where('first_name', '=', 'James');
  }
}

module.exports = CustomerDB;
