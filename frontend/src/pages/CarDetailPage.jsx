import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCarById, createReservation } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { makeAbsoluteImageUrl } from '../utils/imageUtils';
import { 
  FaCalendarAlt, FaGasPump, FaCar, FaCogs, FaUsers, FaStar, 
  FaCheckCircle, FaChevronLeft 
} from 'react-icons/fa';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationDates, setReservationDates] = useState({ startDate: '', endDate: '' });
  const [formError, setFormError] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await getCarById(id);
        setCar(response.data);
      } catch (err) {
        setError("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setReservationDates((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () => {
    if (!reservationDates.startDate || !reservationDates.endDate || !car) return 0;
    const start = new Date(reservationDates.startDate);
    const end = new Date(reservationDates.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days * car.prix_par_jour : 0;
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isAuthenticated) {
      setFormError('You must be logged in to make a reservation.');
      return;
    }
    if (car.statut !== 'disponible') {
        setFormError('This car is not available for reservation.');
        return;
    }

    if (!reservationDates.startDate || !reservationDates.endDate) {
      setFormError('Please select both start and end dates.');
      return;
    }

    const startDate = new Date(reservationDates.startDate);
    const endDate = new Date(reservationDates.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate >= endDate) {
      setFormError('End date must be after the start date.');
      return;
    }
    if (startDate < today) {
        setFormError('Start date cannot be in the past.');
        return;
    }

    try {
      const response = await createReservation({
        id_utilisateur: user.id,
        id_voiture: id,
        date_début: reservationDates.startDate,
        date_fin: reservationDates.endDate,
        statut: 'en attente',
      });
      
      setReservationDetails({
        id: response.data.id,
        totalPrice: calculateTotalPrice(),
      });
      setShowConfirmationModal(true);
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to create reservation.');
    }
  };

  if (loading || authLoading) return <div className="spinner-container"><LoadingSpinner /></div>;
  if (error) return <div className="container error-message">{error}</div>;
  if (!car) return <div className="container error-message">Car not found.</div>;

  const totalPrice = calculateTotalPrice();

  return (
    <div className={`new-car-detail-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <Link to="/cars" className="back-link"><FaChevronLeft /> Back to Fleet</Link>
        <div className="detail-layout">
          <div className="image-column">
            <img 
              src={makeAbsoluteImageUrl(car.image_url)} 
              alt={`${car.marque} ${car.modele}`} 
              className="main-car-image"
            />
          </div>
          <div className="details-column">
            <span className={`status-badge ${car.statut === 'disponible' ? 'available' : 'unavailable'}`}>
              {car.statut}
            </span>
            <h1>{car.marque} {car.modele}</h1>
            <p className="car-year">{car.annee}</p>
            <div className="car-price">
              <span className="price-amount">${car.prix_par_jour}</span> / day
            </div>
            <p className="car-description">{car.description}</p>
            
            <h3>Features</h3>
            <div className="features-grid">
              <div className="feature-item"><FaCar /><span>{car.type_vehicule}</span></div>
              <div className="feature-item"><FaGasPump /><span>{car.type_carburant}</span></div>
              <div className="feature-item"><FaCogs /><span>{car.boite_vitesse}</span></div>
              <div className="feature-item"><FaUsers /><span>{car.nombre_places} seats</span></div>
              <div className="feature-item"><FaStar /><span>Premium</span></div>
              <div className="feature-item"><FaCheckCircle /><span>Insurance</span></div>
            </div>
          </div>
          <div className="booking-column">
            <div className="booking-box">
              <h3>Reserve this car</h3>
              {!isAuthenticated ? (
                <div className="login-prompt">
                  <p>Please <Link to="/login">log in</Link> to make a reservation.</p>
                </div>
              ) : (
                <form onSubmit={handleReservation}>
                  <div className="date-inputs">
                    <div className="form-group">
                      <label htmlFor="startDate">Start Date</label>
                      <input type="date" id="startDate" name="startDate" value={reservationDates.startDate} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} required disabled={car.statut !== 'disponible'} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endDate">End Date</label>
                      <input type="date" id="endDate" name="endDate" value={reservationDates.endDate} onChange={handleDateChange} min={reservationDates.startDate || new Date().toISOString().split('T')[0]} required disabled={car.statut !== 'disponible' || !reservationDates.startDate} />
                    </div>
                  </div>
                  {totalPrice > 0 && (
                    <div className="price-calculation">
                      <h4>Total Price</h4>
                      <p>${totalPrice}</p>
                    </div>
                  )}
                  {formError && <p className="error-message">{formError}</p>}
                  <button type="submit" className="btn btn-primary" disabled={car.statut !== 'disponible'}>
                    {car.statut === 'disponible' ? 'Reserve Now' : 'Unavailable'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showConfirmationModal} handleClose={() => setShowConfirmationModal(false)} title="Reservation Confirmation">
          <div className="confirmation-content">
              <h4>Reservation Successful!</h4>
              <p>Your reservation for the {car.marque} {car.modele} is confirmed.</p>
              <p><strong>Reservation ID:</strong> {reservationDetails?.id}</p>
              <p><strong>Total Price:</strong> ${reservationDetails?.totalPrice}</p>
              <button onClick={() => navigate('/my-reservations')} className="btn btn-primary">View My Reservations</button>
          </div>
      </Modal>
    </div>
  );
};

export default CarDetailPage;
