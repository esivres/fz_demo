import React, { useState } from 'react';

const Input = ({ label, ...other }) => {
  return (
    <div className="uk-margin">
      {label && <label className="uk-form-label" htmlFor="form-stacked-text">{label}</label>}
      <div className="uk-form-controls">
        <input 
          id="form-stacked-text"
          className="uk-input"
          type="text"
          placeholder="Some text..."
          {...other} 
        />
      </div>
    </div>
  )
}

export default Input;