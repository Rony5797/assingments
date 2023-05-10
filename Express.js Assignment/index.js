const express = require('express');
const app = express();
const port = 5000; 


// Serve static files from the "public" directory
app.use(express.static('public'));

// Array to store books
let books = [];

// Middleware to parse JSON in request body
app.use(express.json());

// Generate a unique ID
const generateId = () => {
  return '_' + Math.floor((Math.random() * 1000) * 1000);
};

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    res.status(400).json({ error: 'Title and author are required.' });
  } else {
    const newBook = {
      id: generateId(),
      title,
      author,
      publishedDate: publishedDate || ''
    };
    books.push(newBook);
    res.status(201).json(newBook);
  }
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const index = books.findIndex((book) => book.id === bookId);
    
  if (index === -1) {
    res.status(404).json({ message: 'Book not found.' });
  } else {
    books.splice(index, 1);
    res.json({ message: 'Book deleted successfully.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});