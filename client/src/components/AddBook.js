import React, { useState, useMemo } from 'react';
import {
  GET_AUTHORS_QUERY,
  ADD_BOOK_MUTATION,
  GET_BOOKS_QUERY
} from '../queries/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';


const getOptions = (loading, error, data) => {
  if (loading) {
     return <option disabled>Loading Authors...</option>;
  } else if (error) {
     return <option disabled>Error loading Authors</option>;
  } else {
     return data.authors.map(({ name, id }) => {
        return (
           <option key={id} value={id}>
              {name}
           </option>
        );
     });
  }
};

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  const [formValue, setFormValue] = useState({
   name: '',
   genre: '',
   author: '' 
  })

  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('formValue', formValue)
  }

  return (
    <form id="add-book" onSubmit={(e) => handleSubmit(e)}>
      <div className="field">
        <label>Book name:</label>
        <input name="name" type="text" onChange={(e) => handleChange(e)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input name="genre" type="text" onChange={(e) => handleChange(e)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select name="author" onChange={(e) => handleChange(e)}>
          <option>Select Author</option>
          {options}
        </select>
      </div>

      <button>+</button>
    </form>
 );
}

export default AddBook;
