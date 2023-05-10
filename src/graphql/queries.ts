import { gql } from "@apollo/client";

// Queries
export const GET_USER = gql`
  query getUser($id: Int!) {
    User(id: $id) {
      id
      about
      status @client
    }
  }
`;
