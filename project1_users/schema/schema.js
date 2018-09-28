const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const _ = require("lodash");

// 2 required properties: name (string) / fields (object) -- all the names of the props the User has
// schemas - what the data looks like
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "24", firstName: "Denis", age: 22 }
];

// the injection point for all queries
// ask me about users, if you give me the id of the user you're looking for, I'll give back a user
//resolve! - where we go into the DB and find the data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return a particular user
        return _.find(users, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
