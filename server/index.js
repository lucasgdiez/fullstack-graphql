const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.google.com",
    description: "Google Website"
  },
  {
    id: "link-1",
    url: "www.twitter.com",
    description: "Twitter Website"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This is the API of a HackerNews Clone",
    feed: () => links,
    link: (parent, args) => {
      return links.find((data) => {
        return data.id === args.id;
      });
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./server/schemas/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
