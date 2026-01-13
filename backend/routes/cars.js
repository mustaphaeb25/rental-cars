


const express = require('express');
const router = express.Router();
const db = require('../data/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });


router.get('/', (req, res) => {
  db.query('SELECT * FROM voitures', (err, results) => {
    if (err) {
      console.error("Error fetching cars:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a single car by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM voitures WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error("Error fetching car by ID:", err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Car not found' });
    res.json(results[0]);
  });
});

// Add a new car (with image upload)
router.post('/', upload.single('image'), (req, res) => {
  const { marque, modele, prix_par_jour, statut, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate input
  if (!marque || !modele || !prix_par_jour) {
    return res.status(400).json({ error: 'Required fields: marque, modele, prix_par_jour.' });
  }

  // Default statut if not provided
  const carStatut = statut || 'disponible';

  db.query(
    'INSERT INTO voitures (marque, modele, prix_par_jour, image_url, statut, description) VALUES (?, ?, ?, ?, ?, ?)',
    [marque, modele, prix_par_jour, image_url, carStatut, description],
    (err, result) => {
      if (err) {
        console.error("Error saving car:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Car added successfully!', carId: result.insertId });
    }
  );
});

// Update an existing car (with optional image upload)
router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { marque, modele, prix_par_jour, statut, description } = req.body;
  let image_url = null;

  // If a new image is uploaded, update the image_url
  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }

  // Build update fields dynamically to only update provided fields
  const updateFields = [];
  const params = [];

  if (marque !== undefined) {
    updateFields.push('marque = ?');
    params.push(marque);
  }
  if (modele !== undefined) {
    updateFields.push('modele = ?');
    params.push(modele);
  }
  if (prix_par_jour !== undefined) {
    updateFields.push('prix_par_jour = ?');
    params.push(prix_par_jour);
  }
  if (statut !== undefined) {
    updateFields.push('statut = ?');
    params.push(statut);
  }
  if (description !== undefined) {
    updateFields.push('description = ?');
    params.push(description);
  }
  if (image_url !== null) {
    updateFields.push('image_url = ?');
    params.push(image_url);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update provided.' });
  }

  const query = `UPDATE voitures SET ${updateFields.join(', ')} WHERE id=?`;
  params.push(id);

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating car:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car updated successfully!', id, ...req.body, image_url });
  });
});

// Delete a car
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM voitures WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error("Error deleting car:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted successfully!' });
  });
});


module.exports = router;