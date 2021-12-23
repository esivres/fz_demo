import {Model, Server} from "miragejs";

import {employee, location, order} from "./factories"

export const makeServer = ({environment = "development"} = {}) => new Server({
    environment,
    models: {
        order: Model,
        outfit: Model,
        vehicle: Model,
        employee: Model,
        customer: Model,
        location: Model,

    },
    seeds(server) {
        server.createList('location', 100)
        server.createList('employee', 50);
        server.createList('order', 50);
        server.create('employee', {
            dob: "17.09.2021",
            documentDate: "29.10.2021",
            documentIssuerCode: "40-994",
            documentIssuerName: "Hoppe and Sons",
            documentNumber: 456389,
            documentSeries: 7429,
            fio: "Eric Zieme",
            position: "CLIENT_MANAGER",
            searchStatus: "",
            searchString: "Eric Zieme 456389"
        });
        server.create('location', {
            addrLine: "Apt. 055",
            searchStatus: "DELIVERY",
            searchString: "Nicolas Trail Apt. 055",
            street: "Nicolas Trail",
            type: "DELIVERY",
            zipCode: "57289"
        });
    },
    factories: {
        employee,
        order,
        location,
    },
    routes() {
        this.namespace = "api";
        this.timing = 750;

        this.get("/:type", (schema, request) => {
            let modelName = request.params.type + 's';
            let searchString = request.queryParams.s;
            let sel = request.queryParams.selectors;
            let selectors = (sel != null && sel.split(',')) || [];
            let order = request.queryParams.order;
            return schema[modelName].all().filter(item => {
                let tr = true
                if (searchString !== '') {
                    tr = (item.searchString || '').toUpperCase().indexOf(searchString.toUpperCase()) > -1
                }
                if (tr && selectors.length > 0) {
                    tr = selectors.indexOf(item.searchStatus) > -1
                }
                return tr;
            }).models
        });

        this.patch("/:type/:id", (schema, request) => {
            let modelName = request.params.type + 's';
            let attrs = JSON.parse(request.requestBody);

            return schema[modelName].todos.find(request.params.id).update(attrs);
        });

        this.post(
            "/:type",
            (schema, request) => {
                let modelName = request.params.type + 's';
                let attrs = JSON.parse(request.requestBody);
                return schema[modelName].create(attrs)[request.params.type];
            },
            {timing: 2000}
        );
        this.delete("/:type/:id", (schema, request) => {
            let modelName = request.params.type + 's';
            return schema[modelName].find(request.params.id).destroy();
        });
    }
});