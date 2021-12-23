import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux'

import Form from './Form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ORDER_STATUS = {
  'WORK': 'Ожидают',
  'ALERT': 'Просроченные',
  'COMPLETE': 'Исполненно',
};

const OrderCard = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const company = useSelector(({ company: { list }}) => list);

  return (
    <div className="uk-card uk-card-hover uk-card-body uk-text-left">
      <Form {...props} company={company} isDisabled>
        <button 
          className="uk-button uk-button-default"
          onClick={openModal}
        >Редактировать</button>
      </Form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form {...props} company={company} onSubmit={(el) => console.log({ el }) || closeModal()} closeModal={closeModal} isEdit />
      </Modal>

    </div>
  )
}

export default OrderCard;