import { gql } from "apollo-boost";

const RESTAURANT_QUERY = gql`
  {
    restaurants {
      uuid
      title
      imageUrl
      largeImageUrl
      location
      categories {
        id
        name
      }
      tags {
        _id
        title
      }
      publicContact
      deliveryType {
        value
        label
      }
      dietary {
        value
        label
      }
    }
  }
`;

const USER_ORDER_QUERY = gql`
  query ($userID: String) {
    userOrders(userID: $userID) {
      id
      description
      totalCost
      dateTime
      deliveryStatus
      status
      deliveryType
      customerID
      restaurantID
      address
      additionalAddresses
      deliveryNote
      name
    }
  }
`;
const RESTAURANT_ONE_QUERY = gql`
  query ($restaurantID: String) {
    getRestaurant(restaurantID: $restaurantID) {
      uuid
      title
      imageUrl
      largeImageUrl
      location
      categories {
        id
        name
      }
      publicContact
      deliveryType {
        value
        label
      }
      dietary {
        value
        label
      }
      sections {
        uuid
        title
        itemUuids
      }
      items
    }
  }
`;
const RESTAURANT_ORDER_QUERY = gql`
  query ($restaurantID: String) {
    restaurantOrders(restaurantID: $restaurantID) {
      id
      description
      totalCost
      dateTime
      deliveryStatus
      status
      deliveryType
      customerID
      restaurantID
      address
      additionalAddresses
      deliveryNote
      name
    }
  }
`;

export {
  RESTAURANT_QUERY,
  USER_ORDER_QUERY,
  RESTAURANT_ONE_QUERY,
  RESTAURANT_ORDER_QUERY,
};
