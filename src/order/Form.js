import React from 'react';
import { format } from 'date-fns'
import Input from './Input';
import Select from './Select';

const ORDER_STATUS = {
  'WORK': 'Ожидают',
  'ALERT': 'Просроченные',
  'COMPLETE': 'Исполненно',
};

const Form = ({ 
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
  type,
  isDisabled = false,

  children,
  onSubmit,
}) => {
  const date = format(new Date(deliveryDate), 'MM/dd/yyyy');

  return (
    <form onSubmit={onSubmit}>
      <h2 className="uk-heading-bullet">Заказ #{id}</h2>
      <div className="uk-flex uk-flex-between">
        <fieldset className="uk-fieldset uk-width-1-2">
          <legend className="uk-legend">Отправитель</legend>
          <Input label="Наименование Компании" value={companyNameSender} disabled={isDisabled} />
          <Input label="Адресс" value={comapnyAddressSender} disabled={isDisabled} />
          <Input label="Фамилия, имя, отчество" value={fioSender} disabled={isDisabled} />
          <Input label="Номер телефона" value={phoneNumberSender} disabled={isDisabled} />
          <Input label="Адрес электронной почты" value={emailSender} disabled={isDisabled} />
        </fieldset>
        <fieldset className="uk-fieldset uk-width-1-2 uk-margin-medium-left">
          <legend className="uk-legend">Получатель</legend>
          <Input label="Наименование Компании" value={companyNameRecipient} disabled={isDisabled} />
          <Input label="Адресс" value={comapnyAddressRecipient} disabled={isDisabled} />
          <Input label="Фамилия, имя, отчество" value={fioRecipient} disabled={isDisabled} />
          <Input label="Номер телефона" value={phoneNumberRecipient} disabled={isDisabled} />
          <Input label="Адрес электронной почты" value={emailRecipient} disabled={isDisabled} />
        </fieldset>
      </div>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Информация о грузе</legend>
        <Input label="Количество груза" value={count} disabled={isDisabled} />
        <Input label="Дата доставки" value={date} disabled={isDisabled} />
        <Select label="Статус" options={Object.values(ORDER_STATUS)} value={ORDER_STATUS[type]} disabled={isDisabled} />
      </fieldset>
      {children}
    </form>
  )
}

export default Form;