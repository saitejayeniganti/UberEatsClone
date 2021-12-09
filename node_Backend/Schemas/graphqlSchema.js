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

const Category = new GraphQLObjectType({
  name: "category",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    value: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

const Tag = new GraphQLObjectType({
  name: "tag",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});

const DeliveryType = new GraphQLObjectType({
  name: "deliveryType",
  fields: () => ({
    value: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

const Dietary = new GraphQLObjectType({
  name: "dietary",
  fields: () => ({
    value: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

const Section = new GraphQLObjectType({
  name: "section",
  fields: () => ({
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    itemUuids: { type: new GraphQLList(GraphQLString) },
  }),
});

const Dish = new GraphQLObjectType({
  name: "dish",
  fields: () => ({
    _id: { type: GraphQLString },
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    description: { type: GraphQLString },
    itemDescription: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: new GraphQLList(Category) },
    rules: { type: GraphQLString },
    customizationIds: { type: GraphQLString },
    restaurantID: { type: GraphQLString },
  }),
});

const Restaurant = new GraphQLObjectType({
  name: "restaurant",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    largeImageUrl: { type: GraphQLString },
    location: { type: GraphQLString },
    categories: { type: new GraphQLList(Category) },
    tags: { type: new GraphQLList(Tag) },
    sections: { type: new GraphQLList(Section) },
    etaRange: { type: GraphQLString },
    rawRatingStats: { type: GraphQLString },
    publicContact: { type: GraphQLString },
    priceBucket: { type: GraphQLString },
    email: { type: GraphQLString },
    Password: { type: GraphQLString },
    timings: { type: GraphQLString },
    deliveryType: { type: new GraphQLList(DeliveryType) },
    dietary: { type: new GraphQLList(Dietary) },
    items: { type: GraphQLString },
    msg: { type: GraphQLString },
  }),
});

const Body = new GraphQLObjectType({
  name: "body",
  fields: () => ({
    msg: { type: GraphQLString },
  }),
});

const Response = new GraphQLObjectType({
  name: "response",
  fields: () => ({
    status: { type: GraphQLString },
    body: { type: Body },
  }),
});

const RestaurantResponse = new GraphQLObjectType({
  name: "restaurantResponse",
  fields: () => ({
    status: { type: GraphQLString },
    body: { type: Restaurant },
  }),
});

const UserInputType = new GraphQLInputObjectType({
  name: "userInputType",
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
  }),
});

const OrderInputType = new GraphQLInputObjectType({
  name: "orderInputType",
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

const CategoryInput = new GraphQLInputObjectType({
  name: "categoryInput",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    value: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

const TagInput = new GraphQLInputObjectType({
  name: "tagInput",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});

const DeliveryTypeInput = new GraphQLInputObjectType({
  name: "deliveryTypeInput",
  fields: () => ({
    value: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

const DietaryInput = new GraphQLInputObjectType({
  name: "dietaryInput",
  fields: () => ({
    value: { type: GraphQLString },
    label: { type: GraphQLString },
  }),
});

const SectionInput = new GraphQLInputObjectType({
  name: "sectionInput",
  fields: () => ({
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    itemUuids: { type: new GraphQLList(GraphQLString) },
  }),
});

const DishInput = new GraphQLInputObjectType({
  name: "dishInput",
  fields: () => ({
    _id: { type: GraphQLString },
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    description: { type: GraphQLString },
    itemDescription: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: new GraphQLList(Category) },
    rules: { type: GraphQLString },
    customizationIds: { type: GraphQLString },
    restaurantID: { type: GraphQLString },
  }),
});

const RestaurantInput = new GraphQLInputObjectType({
  name: "restaurantInput",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    uuid: { type: GraphQLString },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    largeImageUrl: { type: GraphQLString },
    location: { type: GraphQLString },
    categories: { type: new GraphQLList(CategoryInput) },
    tags: { type: new GraphQLList(TagInput) },
    sections: { type: new GraphQLList(SectionInput) },
    etaRange: { type: GraphQLString },
    rawRatingStats: { type: GraphQLString },
    publicContact: { type: GraphQLString },
    priceBucket: { type: GraphQLString },
    email: { type: GraphQLString },
    Password: { type: GraphQLString },
    password: { type: GraphQLString },
    timings: { type: GraphQLString },
    deliveryType: { type: new GraphQLList(DeliveryTypeInput) },
    dietary: { type: new GraphQLList(DietaryInput) },
    items: { type: GraphQLString },
    msg: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      description: "Get all users",
      resolve: () => getAllUsers(),
    },
    userOrders: {
      type: new GraphQLList(Order),
      description: "Get all user orders",
      args: {
        userID: { type: GraphQLString },
      },
      resolve: (parent, args) => getUserOrders(args.userID),
    },
    restaurants: {
      type: new GraphQLList(Restaurant),
      description: "Get all restaurants",
      resolve: async () => {
        const response = await getAllRestaurants();
        return response;
      },
    },
    getRestaurant: {
      type: Restaurant,
      description: "Get a restaurant",
      args: {
        restaurantID: { type: GraphQLString },
      },
      resolve: (parent, args) => getRestaurant(args.restaurantID),
    },
    restaurantOrders: {
      type: new GraphQLList(Order),
      description: "Get all restaurant orders",
      args: {
        restaurantId: { type: GraphQLString },
      },
      resolve: (parent, args) => getRestaurantOrders(args.restaurantId),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "Root Mutation",
  fields: () => ({
    userLogin: {
      type: UserResponse,
      description: "User Login",
      args: {
        userDetails: { type: UserInputType },
      },
      resolve: (parent, args) => userLogin(args.userDetails),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
