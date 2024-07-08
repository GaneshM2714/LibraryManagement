import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AddBookForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, yearPublished, genre });
    setTitle('');
    setAuthor('');
    setYearPublished('');
    setGenre('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter book title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter book author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formYearPublished">
        <Form.Label>Year Published</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Enter year published" 
          value={yearPublished} 
          onChange={(e) => setYearPublished(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter book genre" 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Book
      </Button>
    </Form>
  );
}

export default AddBookForm;
