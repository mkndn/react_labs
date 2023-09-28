import { Sequelize, DataTypes } from "sequelize";

/**
 * @returns { Sequelize }
 */
export default createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
  });

  const users = db.define("user", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    email: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    token: DataTypes.STRING,
  });

  const trips = db.define("trip", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    launchId: DataTypes.STRING,
    userId: DataTypes.STRING,
  });

  return { db, users, trips };
};
