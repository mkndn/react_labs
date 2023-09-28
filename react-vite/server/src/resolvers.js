const resolvers = {
  Query: {
    launches: (_, __, { dataSources }) => {
      return dataSources.launchAPI.getLaunches();
    },
  },
  Mutation: {},
};

export default resolvers;
