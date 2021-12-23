import React from 'react'
import {Route, Routes} from "react-router-dom";
import EmployeeSearchCard from "./search/EmployeeCard";
import Search from './Search.js'
import {LocationCard} from "./search/LocationCard";
import OrderCard from "./order/OrderCard";

function Header() {
    return (
        <nav className="uk-navbar-container uk-margin uk-box-shadow-medium" data-uk-navbar>
            <div className="uk-navbar-center">
                <div className="uk-navbar-center-left">
                    <div>
                        <ul className="uk-navbar-nav">
                            <li className="uk-active"><a href="/orders">Заказы</a></li>
                            <li className="uk-active"><a href="/outfit">Наряды</a></li>
                        </ul>
                    </div>
                </div>
                <a className="uk-navbar-item uk-logo" href="#">Транспорт</a>
                <div className="uk-navbar-center-right">
                    <div>
                        <ul className="uk-navbar-nav">
                            <li>
                                <a href="/catalog">Справочники</a>
                                <div className="uk-navbar-dropdown">
                                    <ul className="uk-nav uk-navbar-dropdown-nav">
                                        <li><a href="/catalog/vehicle">Машины</a></li>
                                        <li><a href="/catalog/employee">Сотрудники</a></li>
                                        <li><a href="/catalog/customer">Клиенты</a></li>
                                        <li><a href="/catalog/location">Локации</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="uk-navbar-right">
                <a className="uk-navbar-toggle" href="#">
                    <span data-uk-icon="icon: user"></span> <span className="uk-margin-small-left">Василий Пупкин</span>
                </a>
                <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li><a href="#">Выйти</a></li>
                    </ul>
                </div>
            </div>

        </nav>
        )
}

function PageSelector() {
    return (
            <Routes>
                <Route path="/orders" element={
                    <Search type='orders' selectors={[
                        {name:'Ожидают',key:'work'},
                        {name:'Просроченные',key:'alert'},
                        {name:'Исполненно',key:'complete'}
                    ]}
                    card={OrderCard}
                    />
                } />
                <Route path="/outfit" element={
                    <Search type='outfit'/>
                } />
                <Route path="/catalog/vehicle" element={
                    <Search type='vehicle'/>
                } />
                <Route path="/catalog/employee" element={
                    <Search type='employee' card={EmployeeSearchCard} />
                } />
                <Route path="/catalog/customer" element={
                    <Search type='customer'/>
                } />
                <Route path="/catalog/location" element={<Search type='location' selectors={[
                    {name: 'Ожидание', key: 'IDLE'},
                    {name: 'Обслуживание',key: 'SERVICE'},
                    {name: 'Доставка', key: 'DELIVERY'}]} card={LocationCard}/>}/>
            </Routes>
        )

}

function App() {
    return (
        <div>
            <Header/>
            <PageSelector/>
        </div>
    )
}

export default App;
