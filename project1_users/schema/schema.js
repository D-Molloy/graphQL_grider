const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const axios = require("axios");

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

// the injection point for all queries
// ask me about users, if you give me the id of the user you're looking for, I'll give back a user
//resolve! - where we go into the DB and find the data
// resolve also returns a promise
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //return a particular user
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
