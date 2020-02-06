const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    info: () => "This is the API of a HackerNews Clone",
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (parent, args) => {
      return links.find((data) => {
        return data.id === args.id;
      });
    }
  },
  Mutation: {
    post: (root, args, context) => {
      // const link = {
      //   id: `link-${idCount++}`,
      //   description: args.description,
      //   url: args.url
      // };

      // links.push(link);
      // return link;

      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    updateLink: (parent, args) => {
      const newLink = {
        id: args.id,
        description: args.description,
        url: args.url
      };

      links.find((data, index) => {
        if (data.id === args.id) {
          links[index] = newLink;
        }
      });

      return newLink;
    },
    deleteLink: (parent, args) => {
      links.map((data, index) => {
        if (data.id === args.id) {
          links.splice(index, 1);
        }
      });
      return { ...args };
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./server/schemas/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
