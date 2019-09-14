const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
	Exercise.find()
		.then((exercises) => res.status(200).json(exercises))
		.catch((err) => res.status(400).json({ error: err }));
});

router.route("/add").post((req, res) => {
	const { username, description, duration, date } = req.body;
	const newExercise = new Exercise({
		username,
		description,
		duration: Number(duration),
		date: Date.parse(date) || Date.now()
	});
	newExercise
		.save()
		.then((data) => res.status(201).json(`Added exercise: ${data}`))
		.catch((err) => res.status(400).json(`Error in adding exercise: ${err}`));
});

// Find individual exercise
router.route("/:id").get((req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => res.status(200).json({ exercise }))
		.catch((err) => res.status(400).json({ error: err }));
});

// Delete individual exercise
router.route("/:id").delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then((exercise) => res.status(204).json(`Successfully deleted ${exercise}`))
		.catch((err) => res.status(400).json(`Error in deletion: ${err}`));
});

// Update individual exercise
router.route("/update/:id").post((req, res) => {
	const { username, description, duration, date } = req.body;
	// const update = {
	// 	username,
	// 	description,
	// 	duration: Number(duration),
	// 	date: Date.parse(date)
	// };
	Exercise.findByIdAndUpdate(req.params.id)
		.then((exercise) => {
			// exercise.username = new Exercise({ ...exercise, ...update });
			// console.log(exercise);
			exercise.username = username;
			exercise.description = description;
			exercise.duration = Number(duration);
			exercise.date = Date.parse(date);
			exercise
				.save()
				.then((saved) => res.status(201).json(`Updated ${saved}`))
				.catch((err) => res.status(400).json(`Update error: ${err}`));
		})
		.catch((err) => res.status(400).json(`Error updating: ${err}`));
});

module.exports = router;
