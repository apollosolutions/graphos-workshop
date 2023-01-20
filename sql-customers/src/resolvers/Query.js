module.exports = {
  Query: {
    // Returns the product
    users(_, __, { dataSources }) {
      return dataSources.customerDB.getCustomers();
    },
    user(_, { id }, { dataSources }) {
      console.log('In User resolver, id = ' + id);
      return dataSources.customerDB.getCustomer(id);
    }
  }
};
