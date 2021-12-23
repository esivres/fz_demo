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
            let sorting = request.queryParams.order;
            return schema[modelName].all().filter(item => {
                let tr = true
                if (searchString !== '') {
                    tr = (item.searchString||'').toUpperCase().indexOf(searchString.toUpperCase()) > -1
                }

                if(!tr) return false;
                
                if (tr && selectors.length && item.selectors) {
                  tr = selectors.indexOf(item.selectors) > -1;
                }

                if(!tr) return false;

                return tr;
            }).sort((item1, item2) => {
              if(sorting !== 'ask' && sorting !== 'desc') {
                return 0;
              }
              if(item1.sorting === undefined || item2.sorting === undefined) return 0;

              const left = sorting === 'ask' ? -1 : 1;
              const right = sorting === 'ask' ? 1 : -1;

              let a = item1.sorting;
              let b = item2.sorting;
              if (typeof a === 'string') {
                a = a.toLowerCase();
                b = b.toLowerCase();
              }

              return a === b ? 0 : (a < b ? left : right); 
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