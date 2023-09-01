import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import {Query} from "./resolvers/query"

// import { ApolloServer }  from '@apollo/server';

// export const typeDefs = `#graphql
//   type Query {
//     hello : String!
//   }
// `
// export const Query = {
//   hello: () => "Test Success, GraphQL server is up & running !!",
// };


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
