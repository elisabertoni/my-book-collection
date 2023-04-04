import connection from './connection'
import { Book } from '../../models/book'

// Books functions
export function getAllBooks( db = connection): Promise<Book[]> {
  return db('books').select()
}

export function addBook(newBook: Book, db = connection): Promise<Book[]> {
  return db('books').insert({...newBook})
}