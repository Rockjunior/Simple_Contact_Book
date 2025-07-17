const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (frontend)

// In-memory contacts array
let contacts = [];

// API: Get all contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// API: Add a new contact
app.post('/api/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const contact = { id: Date.now(), name, phone, email };
  contacts.push(contact);
  res.status(201).json(contact);
});

// API: Delete a contact by id
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found.' });
  }
  contacts.splice(index, 1);
  res.status(204).end();
});

// API: Search contacts by name
app.get('/api/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.json([]);
  const results = contacts.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 