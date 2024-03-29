import React, { useState } from 'react';
import { GET_BOOKS_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  const [selected, setSelected] = useState(null);

  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error ...</p>

  const { books } = data;
  const bookListItems = books.map(({ id, name }) => {
    return (
      <li key={id} onClick={() => setSelected(id)}>{name}</li>
    )
  })

  return (
    <div>
      <ul id="book-list">
        {bookListItems}
        <BookDetails bookId={selected} />
      </ul>
    </div>
  )
}

export default BookList;
