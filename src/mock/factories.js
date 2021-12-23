import { Factory, belongsTo } from "miragejs";
import faker from "faker"

const ROLES = ['CLIENT_MANAGER', 'SERVICE_MANAGER', 'TOP_MANAGER', 'ADMINISTRATOR'];
const LOCATION_TYPE = ['IDLE', 'SERVICE', 'DELIVERY']


export const employee = Factory.extend({
  id: (i) => i,
  fio: (i) => faker.name.firstName() + " " + faker.name.lastName(),
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
  fio: (i) => faker.name.firstName() + " " + faker.name.lastName(),
  dob: (i) => faker.date.past().toLocaleDateString(),
  position: (i) => ROLES[i % ROLES.length],
});

export const location = Factory.extend({
  id: (i) => i,

  zipCode: () => faker.address.zipCode(),
  street: () => faker.address.streetName(),
  addrLine: () => faker.address.secondaryAddress(),
  type: () => LOCATION_TYPE[faker.datatype.number(LOCATION_TYPE.length)],
  afterCreate(location, server) {
    location.update({
      searchStatus : location.type,
      searchString: `${location.street} ${location.addrLine}`
    })
  }
})