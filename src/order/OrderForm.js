import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useSelector} from 'react-redux'

import Form from './Form';
import {useNavigate, useParams} from "react-router-dom";


const OrderForm = (props) => {
    const navigate = useNavigate();
    const {orderId} = useParams();
    const [modalIsOpen, setIsOpen] = useState(true);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const closeModal = () => setIsOpen(false) && navigate(-1);
    const company = useSelector(({company: {list}}) => list);
    useEffect(() => {
        setLoading(true);
        setIsOpen(true);
        fetch(`/api/orders/${orderId}`).then(r => r.json())
            .then((data) =>{ setData(data) ; setLoading(false) })
    }, [orderId])
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Order edit"
        >
            {loading && (
                <div className="uk-flex uk-flex-center uk-margin-medium-top uk-margin-medium-bottom">
                    <span uk-spinner="ratio: 4.5"/>
                </div>
            )}
            {!loading && data && (
                <Form {...data} company={company} onSubmit={(el) => console.log({el}) || closeModal()}
                      closeModal={closeModal} isEdit/>
            )}
        </Modal>
    )
}

export default OrderForm;