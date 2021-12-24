import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useSelector} from 'react-redux'

import Form from './Form';
import {useNavigate, useParams} from "react-router-dom";

function getCompanyById(id) {
    return fetch('/api/companies/' + id).then((r) => r.json())
}

const OrderForm = (props) => {
    const navigate = useNavigate();
    const {orderId} = useParams();
    const [modalIsOpen, setIsOpen] = useState(true);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const closeModal = () => setIsOpen(false) && navigate(-1);
    useEffect(() => {
        setLoading(true);
        setIsOpen(true);
        fetch(`/api/orders/${orderId}`).then(r => r.json())
            .then((order) => {
                Promise.all([getCompanyById(order.senderId)
                    , getCompanyById(order.recipientId)]).then(value => {
                    setData({...order, sender:value[0], recipient:value[1]});
                    setLoading(false)
                })
            });
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
            {!loading && (
                <Form {...data} company={[data?.sender,data?.recipient]} onSubmit={(el) => console.log({el}) || closeModal()}
                      closeModal={closeModal} isEdit/>
            )}
        </Modal>
    )
}

export default OrderForm;