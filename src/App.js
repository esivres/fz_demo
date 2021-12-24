import React, {useEffect, useState} from 'react'
import {useKeycloak} from '@react-keycloak/web'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import EmployeeSearchCard from "./search/EmployeeCard";
import Search from './Search.js'
import {LocationCard} from "./search/LocationCard";
import OrderCard from "./order/OrderCard";
import OrderForm from "./order/OrderForm";

function Header() {

    const {keycloak, initialized} = useKeycloak()
    const [userInfo, setUserInfo] = useState({preferred_username: '...'})
    useEffect(() => {
        keycloak.loadUserInfo().then(ui => {
            setUserInfo(ui);
        })
    }, [initialized]);
    return (
        <nav className="uk-navbar-container uk-margin uk-box-shadow-medium" data-uk-navbar>
            <div className="uk-navbar-center">
                <div className="uk-navbar-center-left">
                    <div>
                        <ul className="uk-navbar-nav">
                            <li><Link to="/orders">Заказы</Link></li>
                            <li><Link to="/outfits">Наряды</Link></li>
                        </ul>
                    </div>
                </div>
                <a className="uk-navbar-item uk-logo" href="#">Транспорт</a>
                <div className="uk-navbar-center-right">
                    <div>
                        <ul className="uk-navbar-nav">
                            <li>
                                <Link to="/catalog">Справочники</Link>
                                <div className="uk-navbar-dropdown">
                                    <ul className="uk-nav uk-navbar-dropdown-nav">
                                        <li><Link to="/catalog/vehicles">Машины</Link></li>
                                        <li><Link to="/catalog/employees">Сотрудники</Link></li>
                                        <li><Link to="/catalog/companies">Клиенты</Link></li>
                                        <li><Link to="/catalog/locations">Локации</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="uk-navbar-right">
                <a className="uk-navbar-toggle" href="#">
                    <span data-uk-icon="icon: user"></span> <span
                    className="uk-margin-small-left">{userInfo?.preferred_username}</span>
                </a>
                <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li><a onClick={() => keycloak.logout()}>Выйти</a></li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

function PageSelector() {
    const {keycloak, initialized} = useKeycloak()
    return (
        <Routes>
            <Route path="/">
                <Route path="orders" element={
                    <Search type='orders' selectors={[
                        {name: 'Ожидают', key: 'work'},
                        {name: 'Просроченные', key: 'alert'},
                        {name: 'Исполненно', key: 'complete'}
                    ]}
                            selectorName="type"
                            card={OrderCard}
                    />
                }>
                    <Route path=":orderId" element={<OrderForm/>}/>
                </Route>
                <Route path="outfits" element={
                    <Search type='outfits'/>
                }/>
                <Route path="catalog">
                    <Route path="vehicles" element={
                        <Search type='vehicles'/>
                    }/>
                    <Route path="employees" element={
                        <Search type='employees' card={EmployeeSearchCard}/>
                    }/>
                    <Route path="companies" element={
                        <Search type='companies'/>
                    }/>
                    <Route path="locations" element={<Search type='locations' selectors={[
                        {name: 'Ожидание', key: 'IDLE'},
                        {name: 'Обслуживание', key: 'SERVICE'},
                        {name: 'Доставка', key: 'DELIVERY'}]} card={LocationCard}/>}/>
                </Route>
            </Route>
        </Routes>
    )

}

function AuthRequire() {
    const {keycloak} = useKeycloak()

    function makeRedirect() {
        return  window.location.assign(keycloak.createLoginUrl());
    }

    setTimeout(()=>makeRedirect(),5000)

    return (<div onClick={makeRedirect}>
        <div className="uk-card uk-card-primary uk-card-body">
            <h3 className="uk-card-title">Требуется авторизация</h3>
            <p>Для доступа к ресурсу требуется авторизация</p>
        </div>
    </div>)
}

function MainView() {
    return (<BrowserRouter>
        <div>
            <Header/>
            <PageSelector/>
        </div>
    </BrowserRouter>);
}


function App() {
    const {keycloak} = useKeycloak()


    return keycloak.authenticated
        ? <MainView/> : <AuthRequire/>
}

export default App;
