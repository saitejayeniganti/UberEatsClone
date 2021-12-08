const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
let customer = require("../repository/customer");
let restaurant = require("../repository/restaurant");

const CustomerDetails = new GraphQLObjectType({
  name: "CustomerDetails",
  fields: () => ({
    id: { type: GraphQLInt },

    name: { type: GraphQLString },
    mobile: { type: GraphQLString },
    email_id: { type: GraphQLString },
    password: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    address: { type: GraphQLString },
    nick_name: { type: GraphQLString },
    about: { type: GraphQLString },
    latitude: { type: GraphQLString },
    longitude: { type: GraphQLString },
    image_url: { type: GraphQLString },
  }),
});
