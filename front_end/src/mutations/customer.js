import { gql } from "apollo-boost";

const customersignupMutation = gql`
  mutation ($email: String, $password: String, $mobile: String) {
    customersignup(email: $email, password: $password, mobile: $mobile) {
      message
      id
      status
    }
  }
`;

const customerDetailsMutation = gql`
  mutation (
    $name: String
    $email_id: String
    $mobile: String
    $city: String
    $state: String
    $country: String
    $nick_name: String
    $about: String
    $image_url: String
    $address: String
    $latitude: String
    $longitude: String
    $id: String
  ) {
    customerDetails( $name: String
        email_id: $email_id
        mobile: $mobile
        city:  $city
        state: $state
        country: $country
        nick_name: $nick_name
        about: $about
        image_url: $image_url
        address: $address
        latitude:  $latitude
        longitude: $longitude
        id: $id) {
        email_id,
        mobile,
        city,
        state,
        country,
        nick_name,
        about,
        image_url,
        address,
        latitude,
        longitude,
        id
    }
  }
`;

export { customersignupMutation, customerDetailsMutation };
