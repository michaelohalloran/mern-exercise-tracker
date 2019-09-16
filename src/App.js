import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import ExercisesList from "./ExercisesList";
import CreateExercise from "./CreateExercise";
import EditExercise from "./EditExercise";
import CreateUser from "./CreateUser";
import Navbar from './Navbar';

function App() {
	return (
		<BrowserRouter>
      <Navbar/>
			<Route exact path="/" component={ExercisesList} />
			<Route exact path="/edit/:id" component={EditExercise} />
			<Route exact path="/create" component={CreateExercise} />
			<Route exact path="/user" component={CreateUser} />
		</BrowserRouter>
	);
}

export default App;
