const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3006;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ganu2714',
  database: 'LibraryDB'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Define routes
app.get('/books', (req, res) => {
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get('/members', (req, res) => {
  db.query('SELECT * FROM Members', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get('/borrowing', (req, res) => { // Endpoint for fetching borrowings
  db.query('SELECT * FROM borrowing', (err, results) => { // Query adjusted for 'borrowing' table
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// POST endpoint for adding books
app.post('/books', (req, res) => {
  const { title, author, yearPublished, genre } = req.body;
  const query = 'INSERT INTO Books (Title, Author, YearPublished, Genre) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author, yearPublished, genre], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Book added successfully!', bookId: result.insertId });
  });
});

// POST endpoint for adding members
app.post('/members', (req, res) => {
  const { name, joinDate } = req.body;
  const query = 'INSERT INTO Members (Name, JoinDate) VALUES (?, ?)';
  db.query(query, [name, joinDate], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Member added successfully!', memberId: result.insertId });
  });
});

// POST endpoint for borrowing books
app.post('/borrowing', (req, res) => {
  const { bookID, memberID, borrowDate, returnDate } = req.body;
  const query = 'INSERT INTO borrowing (BookID, MemberID, BorrowDate, ReturnDate) VALUES (?, ?, ?, ?)';
  db.query(query, [bookID, memberID, borrowDate, returnDate], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Book borrowed successfully!', borrowing: result });
  });
});

// DELETE endpoint for removing books
app.delete('/books/:id', (req, res) => {
  const bookID = req.params.id;
  const query = 'DELETE FROM Books WHERE BookID = ?';
  db.query(query, [bookID], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Book not found.' });
    }
    res.status(200).send({ message: 'Book deleted successfully!' });
  });
});


// DELETE endpoint for removing members
app.delete('/members/:id', (req, res) => {
  const memberID = req.params.id;
  const query = 'DELETE FROM Members WHERE MemberID = ?';
  db.query(query, [memberID], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Member not found.' });
    }
    res.status(200).send({ message: 'Member deleted successfully!' });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
