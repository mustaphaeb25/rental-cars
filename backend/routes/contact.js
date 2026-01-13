const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.use(express.json());

router.get('/', (req, res) => {
  const sql = 'SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching contact messages:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }
  const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject || null, message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Contact message saved', id: result.insertId });
  });
});

// DELETE /:id - delete a contact message
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contact_messages WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting contact message:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Contact message deleted' });
  });
});

module.exports = router;