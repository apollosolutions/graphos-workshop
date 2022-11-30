const { RESTDataSource } = require("@apollo/datasource-rest");

// @TODO: Document this in the story
class OrdersAPI extends RESTDataSource {
  baseURL = "";

  async getOrder(id) {
    return this.get(`orders/${encodeURIComponent(id)}`);
  }
}

module.exports = OrdersAPI;
