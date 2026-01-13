import React, { useState, useEffect } from 'react';
// import LoadingSpinner from './LoadingSpinner';
import LoadingSpinner from '../components/LoadingSpinner';
import './CarForm.css';

const CarForm = ({ onSubmit, initialData = {}, loading, error, success }) => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    statut: 'disponible',
    prix_par_jour: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        marque: initialData.marque || '',
        modele: initialData.modele || '',
        statut: initialData.statut || '',
        prix_par_jour: initialData.prix_par_jour || '',
        description: initialData.description || '',
        image: null,
      });
      if (initialData.image_url) {
        setImagePreview(`http://localhost:3000${initialData.image_url}`);
      } else {
        setImagePreview(null);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.marque || !formData.modele || !formData.prix_par_jour || !formData.description) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
            data.append(key, formData[key]);
        }
    });

    onSubmit(data);
  };

  return (
    <form className="new-car-form" onSubmit={handleSubmit}>
      {validationError && <div className="alert alert-danger">{validationError}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="marque">Brand</label>
          <input type="text" id="marque" name="marque" value={formData.marque} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="modele">Model</label>
          <input type="text" id="modele" name="modele" value={formData.modele} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="prix_par_jour">Price per Day</label>
          <input type="number" id="prix_par_jour" name="prix_par_jour" value={formData.prix_par_jour} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="statut">Status</label>
          <select id="statut" name="statut" value={formData.statut} onChange={handleChange}>
            <option value="disponible">Available</option>
            <option value="réservée">Reserved</option>
            <option value="en maintenance">Maintenance</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Car Image</label>
        <input type="file" id="image" name="image" onChange={handleFileChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? <LoadingSpinner size="sm" /> : (initialData.id ? 'Update Car' : 'Add Car')}
      </button>
    </form>
  );
};

export default CarForm;

