import React from 'react';
import Input from './Input';

const OrderCard = ({ 
  id,

  companyNameSender,
  comapnyAddressSender,
  fioSender,
  phoneNumberSender,
  emailSender,

  companyNameRecipient,
  comapnyAddressRecipient,
  fioRecipient,
  phoneNumberRecipient,
  emailRecipient,

  count, 
  deliveryDate,
}) => {
  return (
    <div className="uk-card uk-card-hover uk-card-body uk-text-left">
      <h2 class="uk-heading-bullet">Заказ #{id}</h2>
      <form>
        <div class="uk-flex uk-flex-between">
          <fieldset class="uk-fieldset uk-width-1-2">
            <legend class="uk-legend">Отправитель</legend>
            <Input label="Наименование Компании" value={companyNameSender} disabled />
            <Input label="Адресс" value={comapnyAddressSender} disabled />
            <Input label="Фамилия, имя, отчество" value={fioSender} disabled />
            <Input label="Номер телефона" value={phoneNumberSender} disabled />
            <Input label="Адрес электронной почты" value={emailSender} disabled />
          </fieldset>
          <fieldset class="uk-fieldset uk-width-1-2 uk-margin-medium-left">
            <legend class="uk-legend">Получатель</legend>
            <Input label="Наименование Компании" value={companyNameRecipient} disabled />
            <Input label="Адресс" value={comapnyAddressRecipient} disabled />
            <Input label="Фамилия, имя, отчество" value={fioRecipient} disabled />
            <Input label="Номер телефона" value={phoneNumberRecipient} disabled />
            <Input label="Адрес электронной почты" value={emailRecipient} disabled />
          </fieldset>
        </div>
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">Информация о грузе</legend>
          <Input label="Количество груза" value={count} disabled />
          <Input label="Дата доставки" value={deliveryDate} disabled />
        </fieldset>
      </form>
      
    </div>
  )
}

export default OrderCard;