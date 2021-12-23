import React, { useState } from 'react';

const Input = ({ label, value: text = '', ...other }) => {
  const [value, setValue] = useState(text);
  return (
    <div class="uk-margin">
      {label && <label class="uk-form-label" for="form-stacked-text">{label}</label>}
      <div class="uk-form-controls">
        <input 
          id="form-stacked-text"
          class="uk-input"
          type="text"
          placeholder="Some text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...other} 
        />
      </div>
    </div>
  )
}

export default Input;