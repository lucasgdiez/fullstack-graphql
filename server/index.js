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

//SCHEMA TOO LARGE! LETS R E F A C T O R

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!,
    description: String!,
    url: String!
  }
`;
const resolvers = {
  Query: {
    info: () => "This is the API of a HackerNews Clone",
    feed: () => links
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
