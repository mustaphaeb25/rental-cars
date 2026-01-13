import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getContactMessages, deleteContactMessage } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';
import { FaArrowLeft, FaEnvelope, FaTrash } from 'react-icons/fa';
import './AdminContactMessagesPage.css';

const AdminContactMessagesPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin');
    }
  }, [authLoading, isAdmin, navigate]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getContactMessages();
      setMessages(response.data);
    } catch (err) {
      setError('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  const handleDelete = (messageId) => {
    setSelectedMessage(messageId);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedMessage) return;
    try {
      await deleteContactMessage(selectedMessage);
      fetchMessages();
    } catch (err) {
      setError('Failed to delete message.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (authLoading || loading) {
    return <div className="spinner-container"><LoadingSpinner /></div>;
  }

  return (
    <div className={`new-admin-contact-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="page-header">
          <h1>Contact Messages</h1>
          <p>Review and manage customer inquiries.</p>
        </header>

        <div className="toolbar">
          <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
            <FaArrowLeft /> Dashboard
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="messages-list">
          {messages.length > 0 ? (
            messages.map(msg => (
              <div key={msg.id} className="message-item">
                <div className="message-item-header">
                  <div>
                    <strong>{msg.name}</strong> ({msg.email})
                  </div>
                  <span>{format(new Date(msg.created_at), 'PPPp')}</span>
                </div>
                <h4>{msg.subject}</h4>
                <p>{msg.message}</p>
                <div className="message-actions">
                    <button className="btn-icon btn-danger" onClick={() => handleDelete(msg.id)}><FaTrash /></button>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      </div>
      
      <Modal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} title="Confirm Deletion" onConfirm={confirmDelete}>
          <p>Are you sure you want to delete this message? This cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AdminContactMessagesPage;
