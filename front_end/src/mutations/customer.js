const customerignupMutation = gql`
  mutation ($email: String, $password: String, $mobile: String) {
    customersignup(email: $email, password: $password, mobile: $mobile) {
      message
      id
      status
    }
  }
`;
