const resolvers = {
  Hero: {
    //para cada item que o getHero retornar, vai entrar nessa função
    //fazendo uma subquery
    async skills(root, args, context, info) {
      const skills = root.skills.map((item) => context.Skill.findOne(item));
      const results = await Promise.all(skills);
      const all = results.reduce((prev, next) => prev.concat(next), []);
      return all;
    },
  },
  // GET
  Query: {
    async getHero(root, args, context, info) {
      console.log({
        args,
      });

      return context.Hero.findAll(args);
    },
  },

  // POST (atualizações, cadastro, remoção)
  Mutation: {
    async createHero(root, args, context, info) {
      const { id } = await context.Hero.create(args);
      return id;
    },
  },
};

module.exports = resolvers;
