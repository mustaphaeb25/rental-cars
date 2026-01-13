import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarCard = ({ car, showActions = true, isAdminView = false, onDelete, onEdit }) => {
  const imageUrl = car.image_url ? `http://localhost:3000${car.image_url}` : 'https://via.placeholder.com/150?text=No+Image';

  return (
    <Card className="h-100 shadow-sm hover-grow fade-in">
      <Card.Img variant="top" src={imageUrl} alt={car.modele} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{car.marque} {car.modele}</Card.Title>
        <Card.Text className="mb-1">
          <strong>Price per day:</strong> ${car.prix_par_jour}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Status:</strong> <span className={`badge ${car.statut === 'disponible' ? 'bg-success' : 'bg-danger'}`}>{car.statut}</span>
        </Card.Text>
        <Card.Text className="text-muted flex-grow-1">
          {car.description?.substring(0, 100)}...
        </Card.Text>
        {showActions && (
          <div className="mt-auto d-flex justify-content-between">
            <Button as={Link} to={`/cars/${car.id}`} variant="outline-primary" className="me-2">
              View Details
            </Button>
            {!isAdminView && car.statut === 'disponible' && (
              <Button as={Link} to={`/cars/${car.id}`} variant="primary">
                Book Now
              </Button>
            )}
            {isAdminView && (
              <>
                <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(car)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(car.id)}>
                  Delete
                </Button>
              </>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CarCard;