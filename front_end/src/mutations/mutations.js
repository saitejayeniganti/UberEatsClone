import { gql } from "apollo-boost";

const LOGIN_MUTATION = gql`
  mutation ($userDetails: userInputType) {
    userLogin(userDetails: $userDetails) {
      status
      body {
        id
        name
        nickname
        number
        email
        dob
        address
        imageUrl
        favorites
        msg
      }
    }
  }
`;
const RESTAURANT_LOGIN_MUTATION = gql`
  mutation ($restaurantDetails: restaurantInput) {
    restaurantLogin(restaurantDetails: $restaurantDetails) {
      status
      body {
        id
        title
        email
        publicContact
        largeImageUrl
        imageUrl
        location
        timings
        categories {
          value
          label
        }
        tags {
          _id
          title
        }
        deliveryType {
          value
          label
        }
        dietary {
          value
          label
        }
        msg
      }
    }
  }
`;
const CREATE_USER_MUTATION = gql`
  mutation ($userDetails: userInputType) {
    createUser(userDetails: $userDetails) {
      status
      body {
        msg
      }
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation ($userDetails: userInputType) {
    updateUser(userDetails: $userDetails) {
      status
      body {
        msg
      }
    }
  }
`;
const UPDATE_ORDER_MUTATION = gql`
  mutation ($orderDetails: orderInputType) {
    updateOrder(orderDetails: $orderDetails) {
      status
      body {
        msg
      }
    }
  }
`;
const UPDATE_RESTAURANT_MUTATION = gql`
  mutation ($restaurantDetails: restaurantInput) {
    updateRestaurant(restaurantDetails: $restaurantDetails) {
      status
      body {
        msg
      }
    }
  }
`;
const CREATE_RESTAURANT_MUTATION = gql`
  mutation ($restaurantDetails: restaurantInput) {
    createRestaurant(restaurantDetails: $restaurantDetails) {
      status
      body {
        msg
      }
    }
  }
`;
const UPDATE_FAVORITE_MUTATION = gql`
  mutation ($favoriteDetails: orderInputType) {
    updateFavorites(favoriteDetails: $favoriteDetails) {
      status
      body {
        msg
      }
    }
  }
`;
const CREATE_ORDER_MUTATION = gql`
  mutation ($orderDetails: orderInputType) {
    createOrder(orderDetails: $orderDetails) {
      status
      body {
        msg
      }
    }
  }
`;

export {
  LOGIN_MUTATION,
  RESTAURANT_LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  UPDATE_ORDER_MUTATION,
  UPDATE_RESTAURANT_MUTATION,
  CREATE_RESTAURANT_MUTATION,
  UPDATE_FAVORITE_MUTATION,
  CREATE_ORDER_MUTATION,
};
