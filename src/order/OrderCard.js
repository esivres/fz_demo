import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";


const OrderCard = (props) => {
    const navigate = useNavigate();
    const [sender, setSender] = useState({companyName: '...'})
    const [recipient, setRecipient] = useState({companyName: '...'})
    useEffect(() => {
        fetch('/api/companies/' + props.senderId).then((r) => r.json()).then(setSender)
        fetch('/api/companies/' + props.recipientId).then((r) => r.json()).then(setRecipient)
    }, [])
    return (
        <div onClick={() => navigate(`/orders/${props.id}`)}>
            <div className="uk-card uk-card-hover uk-card-body uk-child-width-expand">
                <h3 className="uk-card-title">Заказ №{props.id}</h3>
                <div className="uk-grid-small" data-uk-grid>
                    <div data-uk-leader="fill: -">От</div>
                    <div>{sender.name}</div>
                </div>
                <div className="uk-grid-small" data-uk-grid>
                    <div data-uk-leader="fill: -">Для</div>
                    <div>{recipient.name}</div>
                </div>
                <div className="uk-grid-small" data-uk-grid>
                    <div data-ul-leader="fill: -">Вес</div>
                    <div>{props.count}</div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;