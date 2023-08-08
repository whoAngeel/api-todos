const { Model, DataTypes, Sequelize } = require("sequelize");

const TASK_TABLE = "tasls";

const TaskSchema = {
	id: {
		autoIncrement: true,
		primaryKEy: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
};