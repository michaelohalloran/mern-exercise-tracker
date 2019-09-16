import React, { Component } from "react";
import "./CreateUser.css";
import { API_BASE_URL } from "./config";
import axios from "axios";

class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ""
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${API_BASE_URL}/users/add`, this.state)
			.then((res) => {
				console.log("Added user: ", res);
				this.setState({ username: "" });
			})
			.catch((err) => console.log(`Error in adding user: ${err}`));
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<form className="create-user-form" onSubmit={this.handleSubmit}>
				<label htmlFor="username" />Username:
				<input
					type="text"
					name="username"
					id="username"
					onChange={this.handleChange}
					value={this.state.username}
				/>
				<button>Submit</button>
			</form>
		);
	}
}

export default CreateUser;
