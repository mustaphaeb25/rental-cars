import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { makeAbsoluteImageUrl } from '../utils/imageUtils';
import { FaCar, FaUsers, FaCheckCircle, FaArrowRight, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import './HomePage.css';

// Client images
import fatimaImage from '../assets/client-1.jpg';
import ahmedImage from '../assets/client-2.jpg';
import saraImage from '../assets/client-3.jpg';
import mustaphaImage from '../assets/client-4.jpg';
import yassineImage from '../assets/client-5.jpg';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Fatima Z.",
      comment: "Absolutely seamless experience! The car was pristine and the service was top-notch.",
      imageUrl: fatimaImage
    },
    {
      id: 2,
      name: "Ahmed K.",
      comment: "Great value for money. The car was reliable and the customer service was excellent.",
      imageUrl: ahmedImage
    },
    {
      id: 3,
      name: "Sara B.",
      comment: "Rented an SUV for a family vacation. The car was spacious and comfortable. Will definitely rent again!",
      imageUrl: saraImage
    },
    {
      id: 4,
      name: "Mustapha A.",
      comment: "Rented an SUV for a family vacation. The car was spacious and comfortable. Will definitely rent again!",
      imageUrl: mustaphaImage
    },
    {
      id: 5,
      name: "Yassine B.",
      comment: "Rented an SUV for a family vacation. The car was spacious and comfortable. Will definitely rent again!",
      imageUrl: yassineImage
    },
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getCars();
        setCars(response.data.filter(car => car.statut === 'disponible').slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.");
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`new-home-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Ride</h1>
          <p className="hero-subtitle">Rent a car for your next adventure with ease and confidence.</p>
          <Link to="/cars" className="btn btn-primary btn-lg">Explore Cars</Link>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars-section">
        <div className="container">
          <h2 className="section-title">Featured Vehicles</h2>
          {loading ? <LoadingSpinner /> : error ? <p className="error">{error}</p> : (
            <div className="cars-grid">
              {cars.map(car => (
                <div key={car.id} className="car-card">
                  <div className="car-image-wrapper">
                    <img src={makeAbsoluteImageUrl(car.image_url)} alt={`${car.marque} ${car.modele}`} className="car-image" />
                  </div>
                  <div className="car-details">
                    <h3>{car.marque} {car.modele}</h3>
                    <p className="price">${car.prix_par_jour} / day</p>
                    <Link to={`/cars/${car.id}`} className="btn btn-secondary">
                      View Details <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="view-all-container">
            <Link to="/cars" className="btn btn-primary">View All Cars</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Redesigned */}
      <section className="why-choose-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-container">
            <div className="feature-card">
              <div className="icon-box">
                <FaCar />
              </div>
              <h3>Wide Selection</h3>
              <p>From luxury sedans to rugged SUVs, finding the perfect match for your journey has never been easier.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">
                <FaCheckCircle />
              </div>
              <h3>Easy Booking</h3>
              <p>Our streamlined, digital-first booking process gets you on the road in minutes, not hours.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">
                <FaUsers />
              </div>
              <h3>Trusted Service</h3>
              <p>Join thousands of satisfied customers who reply on us for transparent pricing and 24/7 support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Stories</h2>

          <div className="carousel-container">
            <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous Slide">
              <FaChevronLeft />
            </button>

            <div className="carousel-track-container">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t.id} className="carousel-slide">
                    <div className="testimonial-card-modern">
                      <FaQuoteLeft className="quote-icon" />
                      <p className="testimonial-text">{t.comment}</p>
                      <div className="testimonial-meta">
                        <img src={t.imageUrl} alt={t.name} className="testimonial-avatar-large" />
                        <h4 className="testimonial-name">{t.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next Slide">
              <FaChevronRight />
            </button>
          </div>

          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
