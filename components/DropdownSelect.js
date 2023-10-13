// File: components/DropdownSelect.js

import React from 'react';

const DropdownSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="dropdown-select">
      <label>{label}:</label>
      <select value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
