import React, { useState, useEffect } from 'react';
import { GET_BOOK_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    skip: !bookId,
    variables: { id: bookId }
  });
  const [detail, setDetail] = useState({
    id: '',
    name: '',
    genre: '',
    author: {
      id: '',
      name: '',
      age: '',
      books: []
    }
  })

  useEffect(() => {
    if (data) {
      const book = data.book
      setDetail({
        id: book.id,
        name: book.name,
        genre: book.genre,
        author: {
          id: book.author.id,
          name: book.author.name,
          age: book.author.age,
          books: [...book.author.books]
        }
      });
    }
  }, [data])

  return (
    <div id="book-details">
      {
        loading && <p>Loading...</p>
      }
      {
        error && <p>Error...</p>
      }
      {
        data && (
          <>
            <h2>{detail.name}</h2>
            <p>{detail.genre}</p>
            <p>{detail.author.name}</p>
            <p>All boooks by this author</p>
            <ul className="other-books">
              {
                detail.author.books.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })
              }
            </ul>
          </>
        )
      }
    </div>
  )
}

export default BookDetails;
