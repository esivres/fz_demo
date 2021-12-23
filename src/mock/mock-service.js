import {Server, Model, Factory, belongsTo} from "miragejs";

import {employee, order,location} from "./factories"

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
                if (searchString != '') {
                    tr = item.searchString.indexOf(searchString) > 0
                }
                if (tr && selectors.length > 0) {
                    tr = selectors.indexOf(item.searchStatus) > -1
                }
                return tr;
            }).models
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