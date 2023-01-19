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
    return this.knex.select("*").from("customers");
  };

  async GetCustomer(id) {
    return this.knex.select('*').from("customers").where('id', id);
  }
}

module.exports = CustomerDB;
