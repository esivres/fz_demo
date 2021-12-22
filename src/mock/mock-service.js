import {Server, Model, Factory, belongsTo} from "miragejs";

import { employee, order } from "./factories"

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
    server.createList('employee', 50);
    server.createList('order', 50);
  },
  factories: {
    employee,
    order,
  },
  routes() {
    this.namespace = "api";
    this.timing = 750;

    this.get("/:type", (schema, request) => {
      const { type } = request.params;

      return schema[type].all().models
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