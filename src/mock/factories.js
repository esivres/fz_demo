import { Factory, belongsTo } from "miragejs";
import faker from "faker"

const ROLES = ['CLIENT_MANAGER', 'SERVICE_MANAGER', 'TOP_MANAGER', 'ADMINISTRATOR'];

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
});

export const order = Factory.extend({
  fio: (i) => faker.name.firstName() + " " + faker.name.lastName(),
  dob: (i) => faker.date.past().toLocaleDateString(),
  position: (i) => ROLES[i % ROLES.length],
});