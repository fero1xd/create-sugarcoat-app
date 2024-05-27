import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./schema";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL!,
  entities: [User],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
