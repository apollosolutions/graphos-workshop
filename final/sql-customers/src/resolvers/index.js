const { Query } = require("./Query");

const resolvers = {
  Query,
  User: {
    id: (parent) => parent.customer_id,
    activeCart: (parent) => parent.active_cart,
    firstName: (parent) => parent.first_name,
    lastName: (parent) => parent.last_name
  },
  Cart: {
    items: (ids) => {
      const variants = ids.split(',');
      return variants.map(id => ({id}));
    },
    subtotal: (parent) => {
      if (parent.items && parent.items.length > 0) {
        const orders = parent.items;
        return orders.reduce(
          (accumulator, currentItem) => accumulator + currentItem.price,
          0
        );
      }
      return 0;
    }
  }
};

module.exports = resolvers;
