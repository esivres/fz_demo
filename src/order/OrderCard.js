import React from 'react';

const OrderCard = ({ fio, position, dob }) => {
  return (
    <div>
      <div className="uk-card uk-card-hover uk-card-body">
        <h3 className="uk-card-title">{fio}</h3>
        <p>{position}</p>
        <time>{dob}</time>
      </div>
    </div>
  )
}

export default OrderCard;