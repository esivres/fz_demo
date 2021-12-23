import React from 'react'
import { useNavigate } from "react-router-dom";

function typeConvert(role){
    switch (role){
        case 'IDLE':
            return 'Ожидание'
        case 'SERVICE':
            return 'Обслуживание'
        case 'DELIVERY':
            return 'Доставки'
    }
}

export function LocationCard(props){
    const navigate = useNavigate();
    return (<div onClick={()=>navigate(`/location/${props.id}`)}>
            <div className="uk-card uk-card-hover uk-card-body">
                <h3 className="uk-card-title">{props.street}</h3>
                <p>{props.addrLine}</p>
                <p>{typeConvert(props.type)}</p>
            </div>
        </div>)
}