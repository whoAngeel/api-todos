const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Aqui van todos los usuario");
});

router.post("/", (req, res) => {
	const body = req.body;
	res.json({
		message: "created user",
		data: body,
	});
});

router.patch("/:id", (req, res) => {
	const { id } = req.params;
	const body = req.body;
	res.json({
		message: "updated",
		data: body,
		id,
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	res.json({
		message: "deleted",
		id,
	});
});

module.exports = router;
