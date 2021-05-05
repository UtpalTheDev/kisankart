import { createServer, Model, RestSerializer } from "miragejs";

import faker from "faker";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      product: Model
    },
    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
    },
    seeds(server) {
      [...Array(10)].forEach((_) => {
        server.create("product", {
          id: faker.random.uuid(),
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.random.boolean(),
          isnew: faker.random.boolean(),
          fastDelivery: faker.random.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([50, 20, 15, 10]),
          idealFor: faker.random.arrayElement(["Men", "Women", "Girl", "Boy"]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional"
          ]),
          color: faker.commerce.color()
        });
      });
    }
  });
}
