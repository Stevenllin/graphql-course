import React from 'react';
import { GET_BOOKS_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';


const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  console.log('data', data);
  return (
    <div>
      <ul id="book-list">
        <li>Book Name</li>
      </ul>
    </div>
  )
}

export default BookList;
