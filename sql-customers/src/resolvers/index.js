const { Query } = require("./Query");

const resolvers = {
  Query,
  User: {
    activeCart: (parent) => parent.active_cart
  },
  Cart: {
    items: (orderIds) => {
      const orders = orderIds.split(',');
      // Returns an array of objects ({id: id})
      return orders.map(id => {id});
    },
    subtotal: (parent) => {
      const orders = parent.items;
      return orders.reduce(
        (accumulator, currentOrder) => accumulator + currentOrder.price,
        0
      );
    }
  }
};

module.exports = resolvers;
