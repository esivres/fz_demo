import {Server, Model, Factory, belongsTo} from "miragejs";
import faker from "faker"

const ROLES = ['CLIENT_MANAGER', 'SERVICE_MANAGER', 'TOP_MANAGER', 'ADMINISTRATOR']

export function makeServer({environment = "development"} = {}) {
    let server = new Server({
        environment,
        models: {
            orders: Model,
            outfit: Model,
            vehicle: Model,
            employee: Model,
            customer: Model,
            location: Model,

        },
        seeds(server) {
            server.createList('employee', 50)
        },
        factories: {
            employee: Factory.extend({
                id(i) {
                    return i
                },
                fio(i) {
                    return faker.name.firstName() + " " + faker.name.lastName()
                },
                dob(i) {
                    return faker.date.past().toLocaleDateString()
                },
                position(i) {
                    return ROLES[i % ROLES.length]
                },
                location: belongsTo("location"),

                documentNumber(i) {
                    return faker.datatype.number({min: 100000 , max: 999999})
                },
                documentSeries(i) {
                    return faker.datatype.number({min: 1000 , max: 9999})
                },
                documentDate(i) {
                    return faker.date.past().toLocaleDateString()
                },
                documentIssuerCode(i) {
                    return faker.datatype.number({min: 10 , max: 99}) + "-" + faker.datatype.number({min: 100 , max: 999})
                },
                documentIssuerName(i) {
                    return faker.company.companyName();
                }
            }),

        },
        routes() {
            this.namespace = "api";
            this.timing = 750;

            this.get("/:type", (schema, request) => {
                let modelName = request.params.type + 's';
                return schema[modelName].all().models
            });

            this.patch("/:type/:id", (schema, request) => {
                let attrs = JSON.parse(request.requestBody).todo;

                return schema[request.params.type].todos.find(request.params.id).update(attrs);
            });

            this.post(
                "/:type",
                (schema, request) => {
                    let attrs = JSON.parse(request.requestBody).todo;

                    return schema[request.params.type].create(attrs);
                },
                {timing: 2000}
            );
            this.delete("/:type/:id", (schema, request) => {
                return schema[request.params.type].find(request.params.id).destroy();
            });
        }
    });

    return server;
}