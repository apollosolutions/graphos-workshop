const { MongoDataSource } = require("apollo-datasource-mongodb");

// @TODO: Document this in the story
class ProductsAPI extends MongoDataSource {
  constructor({ collection, cache, contextValue }) {
    super(collection);
    // Mongodb datasource requires the context, which is done differently 
    // in Apollo v4, so we need to reinitialize with the 
    // request context and cache
    super.initialize({
      context: contextValue,
      cache
    });
  }

  async getProduct(productId) {
    return this.findByFields({
      id: productId
    });
  }

  async getVariant(variantId) {
    return this.findByFields({
      id: variantId,
      type: "variant"
    });
  }

  async searchProducts({ titleStartsWith }) {
    return;
  }

  async searchVariants({ sizeStartsWith }) {
    return;
  }
}

module.exports = ProductsAPI;
