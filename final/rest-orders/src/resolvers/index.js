const resolvers = {
  Query: {
    // Returns the order
    order: (_, { id }, { dataSources }) => dataSources.ordersAPI.getOrder(id)
  },
  // @WORKSHOP: Add story here about resolving by references
  Order: {
    __resolveReference: (order, { dataSources }) => dataSources.ordersAPI.getOrder(order.id),
    buyer: root => ({ 
      id: root.customerId,
      email: 'test@apollographql.com -- from orders subgraph',
      phone: '133-222-4444 -- from orders subgraph'
    }),
    items: root => root.variantIds.map(variantId => ({id: variantId}))
  }
};

module.exports = resolvers;
