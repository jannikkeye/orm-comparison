import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../env";

export const sequelize = new Sequelize(DATABASE_URL); // Example for sqlite
