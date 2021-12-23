import React, { useMemo } from 'react';
import { format } from 'date-fns'

import Input from './Input';
import Select from './Select';

const ORDER_STATUS = {
  'WORK': 'Ожидают',
  'ALERT': 'Просроченные',
  'COMPLETE': 'Исполненно',
};

const findCompany = id => company => company.id === id;

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

  senderId,
  recipientId,

  children,
  onSubmit,
  company,
  isEdit = false,
}) => {
  const [sender, recipient] = useMemo(() => [
    company.find(findCompany(senderId)),
    company.find(findCompany(recipientId)),
  ], [company]);

  if(!company.length) {
    return null;
  }

  const companyOptions = company.map(({ id, name }) => ({ id, title: name }));

  const date = format(new Date(deliveryDate), 'MM/dd/yyyy');
  
  return (
    <form onSubmit={onSubmit}>
      <h2 className="uk-heading-bullet">Заказ #{id}</h2>
      <div className="uk-flex uk-flex-between">
        <fieldset className="uk-fieldset uk-width-1-2">
          <legend className="uk-legend">Отправитель</legend>
          {isEdit ? (
            <Select label="Статус" options={companyOptions} value={senderId} />
          ) : (
            <>
              <Input label="Наименование Компании" value={sender.name} disabled={!isEdit} />
              <Input label="Адресс" value={sender.address} disabled={!isEdit} />
            </>
          )}
          
          <Input label="Фамилия, имя, отчество" value={fioSender} disabled={!isEdit} />
          <Input label="Номер телефона" value={phoneNumberSender} disabled={!isEdit} />
          <Input label="Адрес электронной почты" value={emailSender} disabled={!isEdit} />
        </fieldset>
        <fieldset className="uk-fieldset uk-width-1-2 uk-margin-medium-left">
          <legend className="uk-legend">Получатель</legend>
          {isEdit ? (
            <Select label="Статус" options={companyOptions} value={recipientId} />
          ) : (
            <>
              <Input label="Наименование Компании" value={recipient.name} disabled={!isEdit} />
              <Input label="Адресс" value={recipient.address} disabled={!isEdit} />
            </>
          )}
          
          <Input label="Фамилия, имя, отчество" value={fioRecipient} disabled={!isEdit} />
          <Input label="Номер телефона" value={phoneNumberRecipient} disabled={!isEdit} />
          <Input label="Адрес электронной почты" value={emailRecipient} disabled={!isEdit} />
        </fieldset>
      </div>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Информация о грузе</legend>
        <Input label="Количество груза" value={count} disabled={!isEdit} />
        <Input label="Дата доставки" value={date} disabled={!isEdit} />
        <Select label="Статус" options={Object.values(ORDER_STATUS)} value={ORDER_STATUS[type]} disabled={!isEdit} />
      </fieldset>
      {children}
    </form>
  )
}

export default Form;