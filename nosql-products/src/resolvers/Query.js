module.exports = {
  Query: {
    // Returns the product
    product(_, { id }, { dataSources }) {
      console.log(dataSources)
      return dataSources.productAPI.getProduct(id);
    }
  },
  Product: {
    __resolveReference: (product, { dataSources }) => {
      return dataSources.productAPI.getProduct(id);
    }
  }
};
