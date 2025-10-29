// server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve frontend files

// In-memory cards data
let cards = [
  { id: 1, suit: 'Hearts', value: 'A' },
  { id: 2, suit: 'Spades', value: '10' },
  { id: 3, suit: 'Diamonds', value: 'K' }
];

// Routes
app.get('/cards', (req, res) => res.json(cards));

app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  card ? res.json(card) : res.status(404).send('Card not found');
});

app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).send('Suit and value are required');
  const newCard = { id: cards.length + 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).send('Suit and value are required');
  card.suit = suit;
  card.value = value;
  res.json(card);
});

app.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Card not found');
  const deleted = cards.splice(index, 1);
  res.json(deleted);
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
