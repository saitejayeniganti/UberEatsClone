const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");

const { getAllUsers } = require("./queries/users");
const { getUserOrders } = require("./queries/users");
const { getAllRestaurants, getRestaurant } = require("./queries/restaurants");
const { getRestaurantOrders } = require("./queries/restaurants");

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    password: { type: GraphQLString },
    number: { type: GraphQLString },
    email: { type: GraphQLString },
    dob: { type: GraphQLString },
    address: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    favorites: { type: GraphQLString },
    additionalAddresses: { type: GraphQLString },
    msg: { type: GraphQLString },
  }),
});

const Order = new GraphQLObjectType({
  name: "order",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    description: { type: GraphQLString },
    totalCost: { type: GraphQLFloat },
    dateTime: { type: GraphQLString },
    deliveryStatus: { type: GraphQLString },
    status: { type: GraphQLString },
    deliveryType: { type: GraphQLString },
    customerID: { type: GraphQLString },
    restaurantID: { type: GraphQLString },
    address: { type: GraphQLString },
    additionalAddresses: { type: GraphQLString },
    deliveryNote: { type: GraphQLString },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    number: { type: GraphQLString },
    email: { type: GraphQLString },
    dob: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    favorites: { type: GraphQLString },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CustomerDetails: {
      type: CustomersignupDetails,
      args: {
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
      },
      async resolve(parent, args) {
        console.log("In resolve");
        return await customer.updateCustomer(args);
      },
    },
  },
});
const schema = new GraphQLSchema({
  mutation: Mutation,
});

module.exports = schema;
