const { RESTDataSource } = require("@apollo/datasource-rest");

class OrdersAPI extends RESTDataSource {
  baseURL = "https://rest-api-j3nprurqka-uc.a.run.app/api";
  
  async getOrder(id) {
    return this.get(`orders/${encodeURIComponent(id)}`);
  }
}



module.exports = OrdersAPI;
