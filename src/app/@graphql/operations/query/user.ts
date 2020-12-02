import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';

export const LOGIN_QUERY = gql`
  query getLogin($email: String!, $password: String!, $include: Boolean!) {
    login(email: $email, password: $password) {
      status
      message
      token
      user {
        ...UserObject
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const USERS = gql`
  query users($include: Boolean!){
    users {
      status
      message
      users {
        ...UserObject
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_INFO = gql`
  query meData($include: Boolean!){
    me {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${USER_FRAGMENT}
`;
