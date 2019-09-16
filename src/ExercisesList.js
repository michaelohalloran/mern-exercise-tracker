import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import "./ExercisesList.css";

class ExercisesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exercises: []
		};
	}

	async componentDidMount() {
		const res = await axios.get(`${API_BASE_URL}/exercises`);
		console.log(res);
		this.setState({ exercises: [ ...res.data ] });
	}

	delete = (idx, paramId) => {
		axios
			.delete(`${API_BASE_URL}/exercises/${paramId}`)
			.then((res) => {
				console.log("Successful delete: ", res);
				const updatedExercises = this.state.exercises.filter((exercise, i) => i !== idx);
				this.setState({ exercises: updatedExercises });
			})
			.catch((err) => console.log(`Deletion error: ${err}`));
	};

	render() {
		const exerciseList = this.state.exercises.map((exercise, i) => (
			<div className="exercise-item" key={exercise._id}>
				<h4>{exercise.username}</h4>
				<p>Activity: {exercise.description}</p>
				<p>Time: {exercise.duration}</p>
				<p>Date: {new Date(exercise.date).toDateString()}</p>
				<button onClick={() => this.delete(i, exercise._id)}>X</button>
			</div>
		));

		return <ul className="exercise-container">{exerciseList}</ul>;
	}
}

export default ExercisesList;
