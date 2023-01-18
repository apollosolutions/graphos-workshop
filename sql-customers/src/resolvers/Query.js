module.exports = {
  Query: {
    // Returns the product
    Users(_, __, { dataSources }) {
      return dataSources.customerDB.getCustomers();
    },
    User(_, { id }, { dataSources}) {
      return dataSources.customerDB.getCustomer(id);
    }
  }
};
