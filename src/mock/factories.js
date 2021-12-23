import {belongsTo, Factory} from "miragejs";
import faker from "faker"
import fakerRu from "faker/locale/ru"

const ROLES = ['CLIENT_MANAGER', 'SERVICE_MANAGER', 'TOP_MANAGER', 'ADMINISTRATOR'];
const LOCATION_TYPE = ['IDLE', 'SERVICE', 'DELIVERY'];
const TYPE_ORDER = ['WORK', 'ALERT', 'COMPLETE'];

const fio = () => faker.name.firstName() + " " + faker.name.lastName();
const address = () => `${faker.address.city()}, ${faker.address.streetAddress()}`;
const compamyName = () => faker.company.companyName();
const phone = () => fakerRu.phone.phoneNumber();
const email = () => faker.internet.email();

export const company = Factory.extend({
  name: compamyName,
  address: address,
});

export const employee = Factory.extend({
  id: (i) => i,
  fio,
  dob: (i) => faker.date.past().toLocaleDateString(),
  position: (i) => ROLES[i % ROLES.length],
  location: belongsTo("location"),
  documentNumber: (i) => faker.datatype.number({min: 100000 , max: 999999}),
  documentSeries: (i) => faker.datatype.number({min: 1000 , max: 9999}),
  documentDate: (i) => faker.date.past().toLocaleDateString(),
  documentIssuerCode: (i) => faker.datatype.number({min: 10 , max: 99}) + "-" + faker.datatype.number({min: 100 , max: 999}),
  documentIssuerName: (i) => faker.company.companyName(),
  afterCreate(employee, server) {
    employee.update({
      searchStatus : "",
      searchString: `${employee.fio} ${employee.documentNumber}`
    })
  }

});

export const order = Factory.extend({
  fioSender: fio,
  phoneNumberSender: phone,
  emailSender: email,

  fioRecipient: fio,
  phoneNumberRecipient: phone,
  emailRecipient: email,

  deliveryDate: () => faker.date.future(),
  count: () => faker.datatype.number({ min: 1 , max: 10000 }),
  type: () => TYPE_ORDER[faker.datatype.number(TYPE_ORDER.length - 1)],

  afterCreate(order) {
    order.update({
      searchString: `${order.id} ${order.companyNameSender} ${order.companyNameRecipient} ${order.type.toLowerCase()}`,
      selectors: order.type.toLowerCase(),
      sorting: Number(order.id),
    })
  }
});

export const location = Factory.extend({
  id: (i) => i,

  zipCode: () => faker.address.zipCode(),
  street: () => faker.address.streetName(),
  addrLine: () => faker.address.secondaryAddress(),
  type: () => LOCATION_TYPE[faker.datatype.number(LOCATION_TYPE.length - 1)],
  afterCreate(location, server) {
    location.update({
      searchString: `${location.street} ${location.addrLine}`,
      selectors: location.type,
    })
  }
})