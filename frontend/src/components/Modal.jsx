import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ show, handleClose, title, children, confirmText, onConfirm, showConfirmButton = true }) => {
  return (
    <BootstrapModal show={show} onHide={handleClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {showConfirmButton && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText || 'Confirm'}
          </Button>
        )}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;