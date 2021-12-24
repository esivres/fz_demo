import React, { useMemo, useState } from 'react';
import { Form as ReactForm, Field, useField} from 'react-final-form'
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
    sender,
    recipient,
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
  onSubmit = () => {},
  closeModal = () => {},
  company,
  isEdit = false,
}) => {

  if(!company.length) {
    return null;
  }

  const companyOptions = company.map(({ id, name }) => ({ id, title: name }));
  const statusOptions = Object.keys(ORDER_STATUS).map(el => ({ id: el, title: ORDER_STATUS[el]}));

  const date = format(new Date(deliveryDate), 'MM/dd/yyyy');

  return (
    <ReactForm
      onSubmit={onSubmit}
      initialValues={{
        senderId,
        fioSender,
        phoneNumberSender,
        emailSender,
        recipientId,
        fioRecipient,
        phoneNumberRecipient,
        emailRecipient,
        count: String(count),
        date,
        type,
      }}

      render={({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} className="uk-background-muted uk-padding uk-panel">
          <h2 className="uk-heading-bullet">Заказ #{id}</h2>
          <div className="uk-flex uk-flex-between">
            <fieldset className="uk-fieldset uk-width-1-2">
              <legend className="uk-legend">Отправитель</legend>
              {isEdit ? (
                <Field name="senderId" >
                  {(props) => (
                    <Select label="Компания" options={companyOptions} {...props.input} />
                  )}
                </Field>

              ) : (
                <>
                  <Input label="Наименование Компании" value={sender.name} disabled={!isEdit} />
                  <Input label="Адресс" value={sender.address} disabled={!isEdit} />
                </>
              )}
              <Field name="fioSender">
                {(props) => (
                  <Input label="Фамилия, имя, отчество" {...props.input} disabled={!isEdit} />
                )}
              </Field>
              <Field name="phoneNumberSender">
                {(props) => (
                  <Input label="Номер телефона" {...props.input} disabled={!isEdit} />
                )}
              </Field>
              <Field name="emailSender">
                {(props) => (
                  <Input label="Адрес электронной почты" {...props.input} disabled={!isEdit} />
                )}
              </Field>



            </fieldset>
            <fieldset className="uk-fieldset uk-width-1-2 uk-margin-medium-left">
              <legend className="uk-legend">Получатель</legend>
              {isEdit ? (
                <Field name="recipientId">
                  {(props) => (
                    <Select label="Компания" options={companyOptions} {...props.input} />
                  )}
                </Field>

              ) : (
                <>
                  <Input label="Наименование Компании" value={recipient.name} disabled={!isEdit} />
                  <Input label="Адресс" value={recipient.address} disabled={!isEdit} />
                </>
              )}

              <Field name="fioRecipient">
                {(props) => (
                  <Input label="Фамилия, имя, отчество" disabled={!isEdit} {...props.input} />
                )}
              </Field>
              <Field name="phoneNumberRecipient">
                {(props) => (
                  <Input label="Номер телефона" disabled={!isEdit} {...props.input} />
                )}
              </Field>
              <Field name="emailRecipient">
                {(props) => (
                  <Input label="Адрес электронной почты" disabled={!isEdit} {...props.input} />
                )}
              </Field>
            </fieldset>
          </div>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Информация о грузе</legend>
            <Field name="count">
              {(props) => (
                <Input label="Количество груза" disabled={!isEdit} {...props.input} />
              )}
            </Field>
            <Field name="date">
              {(props) => (
                <Input label="Дата доставки" disabled={!isEdit} {...props.input} />
              )}
            </Field>
            <Field name="type">
              {(props) => (
                <Select label="Статус" options={statusOptions} disabled={!isEdit} {...props.input} />
              )}
            </Field>
          </fieldset>
          {children}
          {isEdit && (
            <div className="uk-flex uk-flex-between">
              <button
                type="submit"
                className="uk-button uk-button-primary"
                disabled={!dirty}
              >Сохранить</button>
              <button
                onClick={closeModal}
                className="uk-button uk-button-danger"
              >Отменить</button>
            </div>
          )}
        </form>
      )}
    />

  )
}

export default Form;