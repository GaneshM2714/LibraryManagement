import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from './AddBookForm';
import AddMemberForm from './AddMemberForm';
import BooksList from './BooksList';
import MembersList from './MembersList';
import BorrowBookForm from './BorrowBookForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import Navbar from './Navbar';

function App() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowings, setBorrowings] = useState([]);

  // Fetch data initially and update state on any changes to 'books' or 'members' arrays
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await axios.get('http://localhost:3006/books');
        const membersResponse = await axios.get('http://localhost:3006/members');
        const borrowingsResponse = await axios.get('http://localhost:3006/borrowing'); // Updated endpoint
        setBooks(booksResponse.data);
        setMembers(membersResponse.data);
        setBorrowings(borrowingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [books, members]); // Dependency array includes 'books' and 'members'

  const handleBookAdded = async (newBookData) => {
    try {
      const response = await axios.post('http://localhost:3006/books', newBookData);
      setBooks([...books, response.data]); // Update books state with new data
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error('There was an error adding the book!', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleMemberAdded = async (newMemberData) => {
    try {
      const response = await axios.post('http://localhost:3006/members', newMemberData);
      setMembers([...members, response.data]); // Update members state with new data
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error('There was an error adding the member!', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleBorrowBook = async (borrowData) => {
    try {
      const response = await axios.post('http://localhost:3006/borrowing', borrowData);
      setBorrowings([...borrowings, response.data.borrowing]); // Update borrowings state with new data
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error('There was an error borrowing the book!', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Library Management System</h1>
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Books</h2>
          <BooksList books={books} setBooks={setBooks} /> {/* Pass books data as prop */}
          <AddBookForm onSubmit={handleBookAdded} /> {/* Pass handleBookAdded function */}
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Members</h2>
          <MembersList members={members} setMembers={setMembers} /> {/* Pass members data as prop */}
          <AddMemberForm onSubmit={handleMemberAdded} /> {/* Pass handleMemberAdded function */}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Borrowings</h2>
        <ul className="list-group mb-3">
          {borrowings.map((borrowing) => (
            <li key={borrowing.BorrowID} className="list-group-item">
              Book ID: {borrowing.BookID}, Member Name: {borrowing.MemberID}, Borrow Date: {new Date(borrowing.BorrowDate).toLocaleDateString()}, Return Date: {new Date(borrowing.ReturnDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <BorrowBookForm books={books} members={members} onSubmit={handleBorrowBook} />
      </div>
    </div>
  );
}

export default App;
