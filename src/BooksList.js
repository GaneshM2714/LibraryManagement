import React from 'react';
import axios from 'axios';
import { Card, Button, ListGroup } from 'react-bootstrap';

function BooksList({ books, setBooks }) {
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/books/${id}`);
      setBooks(books.filter(book => book.BookID !== id));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('There was an error deleting the book!', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <ListGroup>
      {books.map(book => (
        <Card key={book.BookID} className="mb-2">
          <Card.Body>
            <Card.Title>{book.Title || 'Unknown Title'}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{book.Author || 'Unknown Author'}</Card.Subtitle>
            <Card.Text>
              Year: {book.YearPublished || 'Unknown Year'}<br />
              Genre: {book.Genre || 'Unknown Genre'}
            </Card.Text>
            <Button variant="danger" onClick={() => deleteBook(book.BookID)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>
  );
}

export default BooksList;
