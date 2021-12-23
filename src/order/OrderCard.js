import React from 'react';
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

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const company = useSelector(({ company: { list }}) => list);

  return (
    <div className="uk-card uk-card-hover uk-card-body uk-text-left">
      <Form {...props} company={company} onSubmit={(e) => e.preventDefault()} isDisabled>
        <button 
          className="uk-button uk-button-default"
          onClick={openModal}
        >Редактировать</button>
      </Form>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form company={company} isEdit {...props}>
          <div className="uk-flex uk-flex-between">
            <button 
              className="uk-button uk-button-primary"
            >Сохранить</button>
            <button 
              className="uk-button uk-button-danger"
            >Отменить</button>
          </div>
        </Form>
      </Modal>

    </div>
  )
}

export default OrderCard;