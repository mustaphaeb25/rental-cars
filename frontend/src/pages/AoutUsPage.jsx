import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaCar, FaUsers, FaHandshake, FaTrophy, FaShieldAlt, FaStar, FaQuoteRight } from 'react-icons/fa';
import './AboutUsPage.css';

// Team Images
import team1Image from '../assets/team1.jpg';
import team2Image from '../assets/team2.jpg';
import team3Image from '../assets/team3.jpg';

const AboutUsPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`new-about-us-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <header className="about-hero">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="fade-in-up">Redefining Luxury Travel</h1>
            <p className="fade-in-up delay-1">More than just a rental. It's an experience.</p>
          </div>
        </div>
      </header>

      {/* Mission / Story Section */}
      <section className="about-mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h4 className="subtitle">Who We Are</h4>
              <h2>Driving the Future of Mobility</h2>
              <p>
                Founded in 2015, LuxDrive was born from a simple idea: that the journey matters just as much as the destination.
                We wanted to bridge the gap between premium automotive engineering and accessible, seamless service.
              </p>
              <p>
                Today, we stand as a leader in the luxury car rental market, offering a curated fleet of the world's finest vehicles.
                Whether it's a business trip, a special occasion, or just the thrill of the drive, we ensure every mile is memorable.
              </p>
              <div className="quote-box">
                <FaQuoteRight className="quote-icon" />
                <blockquote>
                  "We don't just hand over keys; we unlock experiences. Excellence is not an act, but a habit at LuxDrive."
                </blockquote>
              </div>
            </div>
            <div className="mission-image-wrapper">
              <img
                src="https://unsplash.com/fr/photos/ferrari-458-italia-rouge-garee-devant-un-mur-blanc-eqW1MPinEV4"
                alt="Luxury Car Fleet"
                className="mission-image"
              />
              <div className="founded-badge">
                <span>Est.</span>
                <strong>2015</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><FaTrophy /></div>
              <h3>12k+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaCar /></div>
              <h3>150+</h3>
              <p>Premium Cars</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaShieldAlt /></div>
              <h3>100%</h3>
              <p>Safety Rating</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaUsers /></div>
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-desc">The principles that drive every decision we make.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box"><FaStar /></div>
              <h3>Excellence</h3>
              <p>We refuse to compromise on quality. Every vehicle is pristine, every interaction is professional.</p>
            </div>
            <div className="value-card">
              <div className="value-icon-box"><FaHandshake /></div>
              <h3>Integrity</h3>
              <p>Trust is earned. We believe in transparent pricing, clear terms, and honest communication.</p>
            </div>
            <div className="value-card">
              <div className="value-icon-box"><FaUsers /></div>
              <h3>Customer First</h3>
              <p>You are at the center of everything we do. We tailor our services to fit your unique needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Placeholder (Optional) */}
      <section className="about-team-section">
        <div className="container">
          <h2 className="section-title text-center">Meet the Team</h2>
          <p className="text-center team-desc">Dedicated professionals working behind the scenes.</p>
          {/* Placeholder for future team dynamic components */}
          <div className="team-grid">
            {/* Team Member 1 */}
            <div className="team-card">
              <img src={team1Image} alt="Alex Morgan" className="team-img" />
              <h4>Alex Morgan</h4>
              <p>Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="team-card">
              <img src={team2Image} alt="Sarah Jenks" className="team-img" />
              <h4>Sarah Jenks</h4>
              <p>Head of Operations</p>
            </div>
            {/* Team Member 3 */}
            <div className="team-card">
              <img src={team3Image} alt="Mike Ross" className="team-img" />
              <h4>Mike Ross</h4>
              <p>Fleet Manager</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
