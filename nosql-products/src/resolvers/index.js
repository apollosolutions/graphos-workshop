const { Query } = require("./Query");

const resolvers = {
  Query,
  Product: {
    price: (parent) => parent.regular_price,
    description: (parent) => parent.regular_price,
    attributes: (parent) => {
      return [
        {
          name: parent.attribute_1_name,
          values: parent.attribute_1_values.split("|")
        },
        {
          name: parent.attribute_2_name,
          values: parent.attribute_2_values.split("|")
        },
      ]
    },
    variants: async (parent, __, { dataSources }) => {
      const variants = await dataSources.productsAPI.getProductVariants(parent.sku);
      // Attach the parent to the variant
      return variants.map(variant => ({ ...variant, parent }));
    }
  },
  Variant: {
    colorway: (parent) => parent.attribute_1_values,
    size: (parent) => parent.attribute_2_values,
    price: (parent) => parent.price
  }
};

module.exports = resolvers;
