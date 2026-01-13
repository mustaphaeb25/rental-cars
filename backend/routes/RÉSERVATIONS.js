
const express = require('express');
const router = express.Router();
const db = require("../data/db");

// 1. Route to create a new reservation
router.post('/', (req, res) => {
  // Use date_début and date_fin to match database schema
  const { id_utilisateur, id_voiture, date_début, date_fin, statut } = req.body;

  // Validate input
  if (!id_utilisateur || !id_voiture || !date_début || !date_fin) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    // Use date_début and date_fin in SQL query
    'INSERT INTO reservations (id_utilisateur, id_voiture, date_début, date_fin, statut) VALUES (?, ?, ?, ?, ?)',
    [id_utilisateur, id_voiture, date_début, date_fin, statut || "en attente"],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      res.status(201).json({ 
        message: 'Reservation created successfully!',
        id: result.insertId
      });
    }
  );
});

// 2. Route to get reservations for a specific user
router.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const query = `
    SELECT
      r.id AS id,
      r.id_utilisateur,
      r.id_voiture,
      r.date_début,
      r.date_fin,
      r.statut,
      u.nom AS user_nom,
      u.email AS user_email,
      v.marque,
      v.modele,
      v.prix_par_jour,
      v.image_url,
      v.id AS car_id
    FROM reservations r
    JOIN utilisateurs u ON r.id_utilisateur = u.id
    JOIN voitures v ON r.id_voiture = v.id
    WHERE r.id_utilisateur = ?
    ORDER BY r.date_début DESC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error in user reservations:', {
        error: err,
        sql: err.sql,
        sqlMessage: err.sqlMessage
      });
      return res.status(500).json({ 
        error: 'Database error',
        details: err.message
      });
    }
    res.json(results);
  });
});

// 3. Get all reservations (admin)
router.get('/', (req, res) => {
  const query = `
    SELECT
      r.id AS id,
      r.id_utilisateur,
      r.id_voiture,
      r.date_début,
      r.date_fin,
      r.statut,
      u.nom AS user_nom,
      u.email AS user_email,
      v.marque,
      v.modele,
      v.prix_par_jour,
      v.image_url,
      v.id AS car_id
    FROM reservations r
    JOIN utilisateurs u ON r.id_utilisateur = u.id
    JOIN voitures v ON r.id_voiture = v.id
    ORDER BY r.date_début DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ erreur: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// 4. Update reservation status
router.put('/:id/statut', (req, res) => { 
  const reservationId = req.params.id;
  const { newStatus } = req.body; 

  const allowedStatuses = ['en attente', 'validée', 'refusée', 'annulée'];
  if (!allowedStatuses.includes(newStatus)) {
    return res.status(400).json({ error: 'Invalid status provided. Allowed statuses are: ' + allowedStatuses.join(', ') });
  }
  // --- End validation ---

  const sql = 'UPDATE reservations SET statut = ? WHERE id = ?';
  db.query(sql, [newStatus, reservationId], (err, result) => { // <-- Use newStatus in the query
    if (err) {
      console.error('Database error updating reservation status:', err); // More detailed logging
      return res.status(500).json({ error: 'Server error: Failed to update reservation status.' }); // Consistent English error
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found.' }); // Consistent English message
    }
    res.json({ message: 'Reservation status updated successfully!' }); // Consistent English message
  });
});


module.exports = router;