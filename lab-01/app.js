// Load Express so the program can define routes and send HTTP responses.
const express = require('express');

// Use the hosting platform's port when deployed, or port 3000 on this laptop.
const PORT = process.env.PORT || 3000;

// Create the Express application that will receive browser requests.
const app = express();

// Show the lab welcome message at the root URL.
app.get('/', (request, response) => {
  response.status(200).send('Welcome to Lab 1 - Node.js and Express server');
});

// Return the student's name and section as JSON for the about route.
app.get('/about', (request, response) => {
  response.status(200).json({
    name: 'Sachin Laisetti',
    section: 'CSE-DS-2B'
  });
});

// Create a new timestamp whenever a client requests the current time.
app.get('/time', (request, response) => {
  response.status(200).json({
    dateTime: new Date().toISOString()
  });
});

// Return a not-found response for paths that did not match a route above.
app.use((request, response) => {
  response.status(404).send('404 - Route not found');
});

// Start the web server on the selected port.
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
