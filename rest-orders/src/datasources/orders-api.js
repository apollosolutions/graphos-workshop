const { RESTDataSource } = require("@apollo/datasource-rest");

class OrdersAPI extends RESTDataSource {
  // @TODO: Apply the base URL here
  baseURL = "";

  async getOrder() {
    // @TODO: Make HTTP Get call to endpoint
  }
}

module.exports = OrdersAPI;
