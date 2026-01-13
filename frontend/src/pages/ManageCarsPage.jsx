import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import CarForm from './CarForm';
import Modal from '../components/Modal';
import { getCars, addCar, updateCar, deleteCar } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { translateStatus } from '../utils/statusTranslator';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './ManageCarsPage.css';

const ManageCarsPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [showCarFormModal, setShowCarFormModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDeleteId, setCarToDeleteId] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin');
    }
  }, [authLoading, isAdmin, navigate]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCars();
      setCars(response.data);
    } catch (err) {
      setError("Failed to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCars();
    }
  }, [isAdmin]);

  const handleAddCarClick = () => {
    setCurrentCar(null);
    setShowCarFormModal(true);
  };

  const handleEditCarClick = (car) => {
    setCurrentCar(car);
    setShowCarFormModal(true);
  };
  
  const handleDeleteClick = (carId) => {
    setCarToDeleteId(carId);
    setShowDeleteModal(true);
  };

  const handleCarFormSubmit = async (formData) => {
    setFormError(null);
    setFormSuccess(null);
    try {
      if (currentCar) {
        await updateCar(currentCar.id, formData);
        setFormSuccess('Car updated successfully!');
      } else {
        await addCar(formData);
        setFormSuccess('Car added successfully!');
      }
      fetchCars();
      setShowCarFormModal(false);
    } catch (err) {
      setFormError(err.response?.data?.erreur || 'Failed to save car.');
    }
  };
  
  const confirmDeleteCar = async () => {
    try {
      await deleteCar(carToDeleteId);
      setFormSuccess('Car deleted successfully!');
      fetchCars();
    } catch (err) {
      setFormError(err.response?.data?.erreur || 'Failed to delete car.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (authLoading || loading) {
    return <div className="spinner-container"><LoadingSpinner /></div>;
  }

  return (
    <div className={`new-manage-cars-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="page-header">
          <h1>Manage Vehicles</h1>
          <p>Oversee your entire vehicle fleet from one place.</p>
        </header>

        <div className="toolbar">
          <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
            <FaArrowLeft /> Dashboard
          </button>
          <button className="btn btn-primary" onClick={handleAddCarClick}>
            <FaPlus /> Add Vehicle
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Brand & Model</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.id}>
                  <td><img src={`http://localhost:3000${car.image_url}`} alt={car.marque} className="car-thumbnail" /></td>
                  <td>{car.marque} {car.modele}</td>
                  <td>${car.prix_par_jour}</td>
                  <td><span className={`status-badge ${car.statut}`}>{translateStatus(car.statut)}</span></td>
                  <td>
                    <button className="btn-icon" onClick={() => handleEditCarClick(car)}><FaEdit /></button>
                    <button className="btn-icon btn-danger" onClick={() => handleDeleteClick(car.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal show={showCarFormModal} handleClose={() => setShowCarFormModal(false)} title={currentCar ? 'Edit Vehicle' : 'Add Vehicle'}>
        <CarForm car={currentCar} onSubmit={handleCarFormSubmit} onCancel={() => setShowCarFormModal(false)} />
        {formError && <div className="alert alert-danger" style={{ marginTop: '1rem' }}>{formError}</div>}
      </Modal>
      
      <Modal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} title="Confirm Deletion" onConfirm={confirmDeleteCar}>
        <p>Are you sure you want to delete this vehicle? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ManageCarsPage;
