import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<div className="nav-container">
			<Link to="/">Home</Link>
			<Link to="/user">Create user</Link>
			<Link to="/create">Add exercise</Link>
			{/* <Link to="/">Edit exercise</Link> */}
		</div>
	);
};

export default Navbar;
