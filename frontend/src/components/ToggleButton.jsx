import React from 'react';
import { Form } from 'react-bootstrap';

const ToggleButton = ({ label, checked, onChange }) => {
  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default ToggleButton;