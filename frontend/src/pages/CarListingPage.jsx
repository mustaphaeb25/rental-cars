import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { makeAbsoluteImageUrl } from '../utils/imageUtils';
// import { FaSearch, FaFilter, FaSortAmountDown, FaTimes, FaCar } from 'react-icons/fa';
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes, FaCar, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import './CarListingPage.css';

const CarListingPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getCars();
        setCars(response.data);
        setFilteredCars(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car listings. Please try again later.");
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let currentCars = [...cars];

    if (searchTerm) {
      currentCars = currentCars.filter(car =>
        car.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modele.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterBrand) {
      currentCars = currentCars.filter(car => car.marque.toLowerCase() === filterBrand.toLowerCase());
    }
    if (filterPrice) {
      currentCars = currentCars.filter(car => car.prix_par_jour <= parseFloat(filterPrice));
    }

    switch (sortOption) {
      case 'price-asc':
        currentCars.sort((a, b) => a.prix_par_jour - b.prix_par_jour);
        break;
      case 'price-desc':
        currentCars.sort((a, b) => b.prix_par_jour - a.prix_par_jour);
        break;
      case 'newest':
        currentCars.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        break;
    }

    setFilteredCars(currentCars);
  }, [searchTerm, filterBrand, filterPrice, sortOption, cars]);

  const uniqueBrands = [...new Set(cars.map(car => car.marque))];

  const clearFilters = () => {
    setSearchTerm('');
    setFilterBrand('');
    setFilterPrice('');
    setSortOption('default');
  };
  
  return (
    <div className={`new-car-listing-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="page-header">
        <div className="container">
          <h1>Our Fleet</h1>
          <p>Choose from our wide selection of premium vehicles.</p>
        </div>
      </div>
      <div className="container">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="search"><FaSearch /> Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search for a car..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="brand"><FaFilter /> Brand</label>
            <select id="brand" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
              <option value="">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand.toLowerCase()}>{brand}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="price"><FaSortAmountDown /> Max Price</label>
            <input
              id="price"
              type="range"
              min="0"
              max="1000"
              value={filterPrice}
              onChange={e => setFilterPrice(e.target.value)}
            />
            <span>${filterPrice || '1000'}</span>
          </div>
          <button onClick={clearFilters} className="btn btn-secondary">
            <FaTimes /> Clear
          </button>
        </div>

        <div className="cars-grid">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <img src={makeAbsoluteImageUrl(car.image_url)} alt={`${car.marque} ${car.modele}`} className="car-image" />
                <div className="car-details">
                  <h3>{car.marque} {car.modele}</h3>
                  <p className="price">${car.prix_par_jour} / day</p>
                  <Link to={`/cars/${car.id}`} className="btn btn-primary">
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
