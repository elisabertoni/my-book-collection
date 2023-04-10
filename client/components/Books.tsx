import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

import { Book, BookCreate, BookUpdate } from '../../models/book'
import { fetchBooks, addBook, updateBook, deleteBook } from '../actions/books'
import UpdateBook from './UpdateBook'

export default function Books() {
  const [newBook, setNewBook] = useState( {title: '', author: ''} as BookCreate) 
  const { loading, data, error } = useAppSelector( state => state. booksState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewBook({ ...newBook, [event.target.name]: event.target.value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBook(newBook))
    setNewBook({ title: '', author: ''})
  }

  function handleDelete(bookId: number) {
    dispatch(deleteBook(bookId))
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <img src='/loading-spinner.gif' alt='loading-spinner' />}
      
      <ul>
        {data.map(book => (
          <li key={book.id}>{book.title} by {book.author}
          
          <button onClick={() => handleDelete(book.id)}>Delete</button>
          {<UpdateBook book={book} />}
          
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} aria-label='Add Book'>

        <label htmlFor='bookTitle'>Book Title</label>
        <input
          type='text'
          name='title'
          id='bookId'
          placeholder='Title'
          value={newBook.title}
          onChange={handleChange}
        />

        <label htmlFor='bookAuthor'>Book Author</label>
        <input
          type='text'
          name='author'
          id='bookId'
          placeholder='Author'
          value={newBook.author}
          onChange={handleChange}
        /> 

      <button type='submit'>ADD NEW BOOK</button>
      </form>

    </div>
  )
} 