const express = require("express");
const debug = require("debug")("user-routes");
const UsersService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
	getUserWithTask,
} = require("../schemas/user.schema");
const { createTaskSchema, getTaskSchema } = require("../schemas/task.schema");
const { checkApiKey, checkUser } = require("../middlewares/auth.handler");
const passport = require("passport");

const router = express.Router();
const service = new UsersService();

router.get("/", checkApiKey, async (req, res, next) => {
	try {
		const users = await service.findAll();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get(
	"/:id",
	checkApiKey,
	validatorHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/register",
	validatorHandler(createUserSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newUser = await service.create(body);
			res.json({
				message: "created user",
				newUser,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	validatorHandler(updateUserSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const changes = req.body;
			const userModified = await service.update(id, changes);
			res.json({
				message: "updated",
				userModified,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
);

router.delete(
	"/:id",
	// checkApiKey, // TODO cambiar esto
	validatorHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const response = await service.delete(id);
			res.json({
				message: "deleted",
				response,
			});
		} catch (error) {
			next(error);
		}
	}
);

// TASKS

module.exports = router;
