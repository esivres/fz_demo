import React from 'react';
import Modal from 'react-modal';

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

  return (
    <div className="uk-card uk-card-hover uk-card-body uk-text-left">
      <Form {...props} onSubmit={(e) => e.preventDefault()} isDisabled>
        <button 
          class="uk-button uk-button-default"
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
        <Form {...props}>
          <div class="uk-flex uk-flex-between">
            <button 
              class="uk-button uk-button-primary"
            >Сохранить</button>
            <button 
              class="uk-button uk-button-danger"
            >Отменить</button>
          </div>
        </Form>
      </Modal>

    </div>
  )
}

export default OrderCard;