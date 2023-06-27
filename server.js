const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8081;

app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

    let users = [
    { id: 1, user_name: 'neeraj', first_name: 'Neeraj' , last_name: 'Srivastava' }
    ];

    // Get all users
    app.get('/users', (req, res) => {
        res.json(users);
    });
  
  // Get a specific users by ID
  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(userId);
    const user = users.find((user) => user.id === userId);
  
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  });
  
  // Add a new users
  app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
  // Edit a book
  app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { first_name, last_name } = req.body;
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      res.status(404).json({ error: 'User not found' });
    } else {
        users[index].first_name = first_name;
        users[index].last_name = last_name;
        res.json(users[index]);
    }
  });
  
  // Delete a book
  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      const deletedUser = users.splice(index, 1);
      res.json(deletedUser[0]);
    }
  });
  