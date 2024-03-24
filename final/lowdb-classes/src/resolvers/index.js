const resolvers = {
  Query: {
    // Returns the order
    getClassById: (_, { id }, { dataSources }) => dataSources.classAPI.getClass(id),
    classes: (_, __, { dataSources }) => dataSources.classAPI.getClasses()
  },
  Mutation: {
    // Creates a new class
    createClass: async (_, args, { dataSources }) => {
      return await dataSources.classAPI.createClass(args.class);
    }
  },
  User: {
    __resolveReference: async ({ id }, { dataSources }) => {
      const userClasses = await dataSources.classAPI.getUserClasses(id);
      console.log(userClasses)
      return { id, classes: userClasses };
    }
  }
};

module.exports = resolvers;
