// BorrowBookForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function BorrowBookForm({ books, members, onSubmit }) {
  const [bookID, setBookID] = useState('');
  const [memberID, setMemberID] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bookID, memberID, borrowDate, returnDate });
    setBookID('');
    setMemberID('');
    setBorrowDate('');
    setReturnDate('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="formBookID">
        <Form.Label>Book</Form.Label>
        <Form.Control 
          as="select" 
          value={bookID} 
          onChange={(e) => setBookID(e.target.value)} 
        >
          <option value="">Select a book</option>
          {books.map(book => (
            <option key={book.BookID} value={book.BookID}>
              {book.Title}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formMemberID">
        <Form.Label>Member</Form.Label>
        <Form.Control 
          as="select" 
          value={memberID} 
          onChange={(e) => setMemberID(e.target.value)} 
        >
          <option value="">Select a member</option>
          {members.map(member => (
            <option key={member.MemberID} value={member.MemberID}>
              {member.Name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBorrowDate">
        <Form.Label>Borrow Date</Form.Label>
        <Form.Control 
          type="date" 
          value={borrowDate} 
          onChange={(e) => setBorrowDate(e.target.value)} 
        />
      </Form.Group>
      <Form.Group controlId="formReturnDate">
        <Form.Label>Return Date</Form.Label>
        <Form.Control 
          type="date" 
          value={returnDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Borrow Book
      </Button>
    </Form>
  );
}

export default BorrowBookForm;
