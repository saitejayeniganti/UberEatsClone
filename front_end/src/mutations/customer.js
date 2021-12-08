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
  mutation ($email: String, $password: String, $mobile: String) {
    customersignup(email: $email, password: $password, mobile: $mobile) {
      message
      id
      status
    }
  }
`;
