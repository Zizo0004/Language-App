import React from 'react';
import './RadioButton.css';

const RadioButton = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className="radio-input">
      {options.map((option) => (
        <label key={option.value} className="label">
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <p className="text">{option.label}</p>
        </label>
      ))}
    </div>
  );
};

export default RadioButton; 