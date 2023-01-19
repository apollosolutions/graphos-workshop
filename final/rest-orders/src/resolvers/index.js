const resolvers = {
  Query: {
    // Returns the order
    order(_, { id }, { dataSources }) {
      return dataSources.ordersAPI.getOrder(id);
    }
  },
  // @TODO: Add story here about resolving by references
  Order: {
    __resolveReference: (order, { dataSources }) => {
      return dataSources.ordersAPI.getOrder(order.id);
    }
  }
};

module.exports = resolvers;
