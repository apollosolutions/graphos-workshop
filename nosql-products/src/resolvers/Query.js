module.exports = {
  Query: {
    // Returns the product
    product(_, { id }, { dataSources }) {
      return dataSources.productsAPI.getProduct(id);
    },
    // Searches the product database
    searchProducts(_, { searchInput }, { dataSources }) {
      const { titleStartsWith } = searchInput;
      return dataSources.productsAPI.searchProducts(titleStartsWith);
    }
  },
  Product: {
    __resolveReference: (product, { dataSources }) => {
      return dataSources.productsAPI.getProduct(id);
    }
  }
};
