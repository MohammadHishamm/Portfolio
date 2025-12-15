const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

function readMessages() {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
}

app.use(express.json());

// Serve static files (index.html, css, js, images, etc.)
app.use(express.static(path.join(__dirname)));

// API: save a new contact message
app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const messages = readMessages();
  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject: subject || '',
    message,
    createdAt: new Date().toISOString()
  };

  messages.push(newMessage);
  writeMessages(messages);

  return res.status(201).json({ success: true, message: 'Message saved.', data: newMessage });
});

// API: get all messages (used by dashboard)
app.get('/api/messages', (req, res) => {
  const messages = readMessages();
  res.json(messages);
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


