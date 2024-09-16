// FormInput.js
import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ label, name, type, value, onChange }) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;