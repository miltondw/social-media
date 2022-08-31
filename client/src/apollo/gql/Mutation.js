import { gql } from "@apollo/client";

const REGISTER = gql`
mutation Register($username:String!,$email:String!,$password:String!,$confirmPassword:String!) {
    register(registerInput: {
      username:$username
      email:$email
      password:$password
      confirmPassword:$confirmPassword
    }){
      createdAt
      email
      id
      token
      username
    }
  }
`

export {
  REGISTER
}