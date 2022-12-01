const { MongoDataSource } = require("apollo-datasource-mongodb");

// @TODO: Document this in the story
class ProductsAPI extends MongoDataSource {
  constructor({ collection, cache, contextValue }) {
    super(collection);
    // Mongodb datasource requires the context, which is done differently 
    // in Apollo v4, so we need to reinitialize with the 
    // request context and cache
    // Need to find a better migration as this as this is becoming circular reference
    super.initialize({
      context: contextValue,
      cache
    });
  }

  async getProduct(productId) {
    const products = await this.findByFields({
      id: productId
    });

    return products && products[0] ? products[0] : null;
  }

  async getVariant(variantId) {
    const variations = await this.findByFields({
      id: variantId,
      type: "variation"
    });

    return variations && variations[0] ? variations[0] : null;
  }

  async searchProducts(titleStartsWith) {
    // Query by search text
    const query = { $text: { $search: titleStartsWith } };

    // Sort by relevance
    const sort = { score: { $meta: "textScore" } };

    // Include only the `title` and `score` fields in each returned document
    const projection = {
      _id: 0,
      id: 1,
      name: 1,
      regular_price: 1,
      in_stock: 1,
      images: 1,
    };

    const cursor = this.collection
      .find(query)
      .sort(sort)
      .project(projection)
      .limit(15);

    return await cursor.toArray();
  }

  async searchVariants(sizeStartsWith) {
    // Query by search text
    const query = {
      type: "variation",
      attribute_1_name: "Size",
      $text: { 
        $search: sizeStartsWith
      }
    };

    // Sort by relevance
    const sort = { score: { $meta: "textScore" } };

    const projection = {
      _id: 0,
      id: 1,
      name: 1,
      regular_price: 1,
      in_stock: 1,
      images: 1,
    };

    const cursor = this.collection
      .find(query)
      .sort(sort)
      .project(projection)
      .limit(15);

    return await cursor.toArray();
  }
}

module.exports = ProductsAPI;
