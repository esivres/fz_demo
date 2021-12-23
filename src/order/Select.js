import React, { useState } from 'react';

const Select = ({ label, value: text = '', options = [], ...other }) => {
  const [value, setValue] = useState(text);
  return (
    <div className="uk-margin">
      {label && <label className="uk-form-label" htmlFor="form-stacked-select">{label}</label>}
      <div className="uk-form-controls">
        <select 
          className="uk-select"
          id="form-stacked-select"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          {...other}
        >
          {options.map(el => <option key={el.id || el} value={el.id || el}>{el.title || el}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Select;