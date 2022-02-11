const resolvers = {
  // GET
  Query: {
    async getSkill(root, args, context, info) {
      return "Hello World!";
    },
  },

  // POST (atualizações, cadastro, remoção)
  Mutation: {
    async createSkill(root, args, context, info) {
      return "Hello World!";
    },
  },
};

module.exports = resolvers;
