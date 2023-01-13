const { RESTDataSource } = require("@apollo/datasource-rest");

class OrdersAPI extends RESTDataSource {
  // @TODO 2.1.1: Apply the base URL here
  baseURL = "";

  async getOrder() {
    // @TODO 2.1.2: Make HTTP Get call to endpoint
  }
}

module.exports = OrdersAPI;
