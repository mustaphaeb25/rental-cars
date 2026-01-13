import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaCar, FaCogs, FaGasPump, FaChair, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import './ManageCarsPage.css'; 

const CarForm = ({ car, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    annee: '',
    prix_par_jour: '',
    type_carburant: 'Essence',
    boite_vitesse: 'Manuelle',
    places: '',
    description: '',
    image: null
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (car) {
      setFormData({
        marque: car.marque || '',
        modele: car.modele || '',
        annee: car.annee || '',
        prix_par_jour: car.prix_par_jour || '',
        type_carburant: car.type_carburant || 'Essence',
        boite_vitesse: car.boite_vitesse || 'Manuelle',
        places: car.places || '',
        description: car.description || '',
        image: null // Don't preload file object
      });
      if (car.image_url) {
        setPreviewUrl(`http://localhost:3000${car.image_url}`);
      }
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const data = new FormData();
    data.append('marque', formData.marque);
    data.append('modele', formData.modele);
    data.append('annee', formData.annee);
    data.append('prix_par_jour', formData.prix_par_jour);
    data.append('type_carburant', formData.type_carburant);
    data.append('boite_vitesse', formData.boite_vitesse);
    data.append('places', formData.places);
    data.append('description', formData.description);

    if (formData.image) {
      data.append('image', formData.image);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="car-form-container">
      <div className="form-grid">

        {/* Brand */}
        <div className="form-group">
          <label><FaCar /> Brand</label>
          <input
            type="text"
            name="marque"
            placeholder="e.g. BMW"
            value={formData.marque}
            onChange={handleChange}
            required
          />
        </div>

        {/* Model */}
        <div className="form-group">
          <label><FaCar /> Model</label>
          <input
            type="text"
            name="modele"
            placeholder="e.g. X5"
            value={formData.modele}
            onChange={handleChange}
            required
          />
        </div>

        {/* Year */}
        <div className="form-group">
          <label><FaCalendarAlt /> Year</label>
          <input
            type="number"
            name="annee"
            placeholder="e.g. 2023"
            value={formData.annee}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label><FaMoneyBillWave /> Price/Day ($)</label>
          <input
            type="number"
            name="prix_par_jour"
            placeholder="0.00"
            value={formData.prix_par_jour}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>

        {/* Fuel Type */}
        <div className="form-group">
          <label><FaGasPump /> Fuel Type</label>
          <select name="type_carburant" value={formData.type_carburant} onChange={handleChange}>
            <option value="Essence">Petrol (Essence)</option>
            <option value="Diesel">Diesel</option>
            <option value="Électrique">Electric</option>
            <option value="Hybride">Hybrid</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="form-group">
          <label><FaCogs /> Transmission</label>
          <select name="boite_vitesse" value={formData.boite_vitesse} onChange={handleChange}>
            <option value="Manuelle">Manual</option>
            <option value="Automatique">Automatic</option>
          </select>
        </div>

        {/* Status */}
        <div className="form-group">
          <label><FaCogs /> Status</label>
          <select name="statut" value={formData.statut} onChange={handleChange}>
            <option value="disponible">Available (Disponible)</option>
            <option value="réservée">Reserved (Réservée)</option>
            <option value="indisponible">Unavailable (Indisponible)</option>
            <option value="en maintenance">Maintenance</option>
          </select>
        </div>

        {/* Seats */}
        <div className="form-group">
          <label><FaChair /> Seats</label>
          <input
            type="number"
            name="places"
            placeholder="e.g. 5"
            value={formData.places}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group full-width">
          <label><FaCloudUploadAlt /> Vehicle Image</label>
          <div className="image-upload-wrapper">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              id="car-image-upload"
              className="file-input"
            />
            <label htmlFor="car-image-upload" className="file-label btn btn-secondary">
              Choose File
            </label>
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Enter vehicle details..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save Vehicle</button>
      </div>
    </form>
  );
};

export default CarForm;