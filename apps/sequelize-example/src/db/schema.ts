import { DataTypes } from "sequelize";
import { sequelize } from "./db";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

const Group = sequelize.define("groups", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

const Post = sequelize.define("posts", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
});

User.belongsToMany(Group, { through: "users_groups" });
Group.belongsToMany(User, { through: "users_groups" });

User.hasMany(Post);
Post.belongsTo(User);
