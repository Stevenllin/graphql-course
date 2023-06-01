import { gql } from 'apollo-boost';

export const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;