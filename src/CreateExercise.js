import React, { Component } from "react";
import "./CreateExercise.css";
import { API_BASE_URL } from "./config";
import axios from "axios";

class CreateExercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			description: "",
			duration: 0,
			date: new Date().toJSON().slice(0, 10),
			users: []
		};
	}

	componentDidMount() {
		axios
			.get(`${API_BASE_URL}/users`)
			.then((res) => {
				if (res.data.length > 0) {
					const { data } = res;
					const { username } = data[0];
					const users = data.map((user) => user.username);
					this.setState({ users, username });
				}
			})
			.catch((err) => console.log(`Error in fetching users: ${err}`));
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { username, description, duration, date } = this.state;
		const formData = {
			username,
			description,
			duration: Number(duration),
			date: Date.parse(date)
		};
		// console.log("formData, stateCopy", formData, stateCopy);
		axios
			.post(`${API_BASE_URL}/exercises/add`, formData)
			.then((res) => {
				console.log("res: ", res);
				this.setState({
					username: "",
					description: "",
					duration: 0,
					date: new Date().toJSON().slice(0, 10)
				});
			})
			.catch((err) => console.log(`Error in adding exercise: ${err}`));
		// redirect to exercises list?
	};

	handleChange = (e) => {
		e.target.name !== "users"
			? this.setState({ [e.target.name]: e.target.value })
			: this.setState({ username: e.target.value });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="create-exercise-form">
				<div className="input-container">
					<label htmlFor="users">Users: </label>
					<select name="users" id="users" value={this.state.username} onChange={this.handleChange}>
						{this.state.users.map((user) => (
							<option key={user} value={user}>
								{user}
							</option>
						))}
					</select>
				</div>
				<div className="input-container">
					<label htmlFor="username" />Username
					<input
						type="text"
						id="username"
						onChange={this.handleChange}
						name="username"
						value={this.state.username}
						placeholder="User name"
					/>
				</div>
				<div className="input-container">
					<label htmlFor="description" />Description
					<input
						type="text"
						onChange={this.handleChange}
						name="description"
						value={this.state.description}
						placeholder="Description"
					/>
				</div>
				<div className="input-container">
					<label htmlFor="duration" />Duration
					<input
						type="number"
						onChange={this.handleChange}
						name="duration"
						value={this.state.duration}
						placeholder="Duration"
					/>
				</div>
				<div className="input-container">
					<label htmlFor="date" />Date
					<input
						type="date"
						onChange={this.handleChange}
						name="date"
						value={this.state.date}
						placeholder="User name"
					/>
				</div>
				<button>Submit</button>
			</form>
		);
	}
}

export default CreateExercise;
