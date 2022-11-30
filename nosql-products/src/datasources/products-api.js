const { MongoDataSource } = require("apollo-datasource-mongodb");

// @TODO: Document this in the story
class ProductsAPI extends MongoDataSource {
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
