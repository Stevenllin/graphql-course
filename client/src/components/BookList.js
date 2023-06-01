import React from 'react';
import { GET_BOOKS_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';


const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error ...</p>

  const { books } = data;
  const bookListItems = books.map(({ id, name }) => {
    return (
      <li key={id}>{name}</li>
    )
  })

  console.log('data', data);
  return (
    <div>
      <ul id="book-list">
        {bookListItems}
      </ul>
    </div>
  )
}

export default BookList;
