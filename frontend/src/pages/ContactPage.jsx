import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { sendContactMessage } from '../services/api';
import { FaUser, FaEnvelope, FaPen, FaPaperPlane } from 'react-icons/fa';
import './ContactPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactPage = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFeedback({ type: 'error', message: 'All fields are required.' });
      setLoading(false);
      return;
    }

    try {
      const response = await sendContactMessage(formData);
      setFeedback({ type: 'success', message: response.data.message || 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.error || 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`new-contact-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="contact-container">
        <header className="contact-header">
          <h1>Get in Touch</h1>
          <p>We are here to help. Send us a message and we'll get back to you as soon as possible.</p>
        </header>

        <div className="contact-form-container">
          {feedback.message && (
            <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {feedback.message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"><FaUser /> Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email"><FaEnvelope /> Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject"><FaPen /> Subject</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <LoadingSpinner size="sm" /> : <><FaPaperPlane /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
