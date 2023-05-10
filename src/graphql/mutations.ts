import { gql } from "@apollo/client";

// Mutations
export const UPDATE_USER = gql`
  mutation UpdateUser($about: String!) {
    UpdateUser(about: $about) {
      id
      about
    }
  }
`;
