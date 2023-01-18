const { SQLDataSource } = require("datasource-sql");
const knex = require("knex");

class CustomerDB extends SQLDataSource {
  constructor({config}) {
    super(config);
  }

  initialize(config) {
    this.context = config.context
  }

  async getCustomers() {
      return this.knex.select("*").from("customers");
    };

  async GetCustomer(id) {
    return this.knex.select('*').from("customers").where('id', id);
  }

}

module.exports = CustomerDB;
