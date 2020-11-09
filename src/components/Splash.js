import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
	return (
		<div className="splash has-text-centered is-vcentered">
			<h1 className="title">Welcome to the Shadow Run Character Creator</h1>
			<h3 className="subtitle">Please log in or sign up to begin</h3>

			<Link className="button is-primary is-large" to="/SignUp">
				<strong>Sign up</strong>
			</Link>
			<Link className="button is-light is-large" to="/SignIn">
				Log in
			</Link>
		</div>
	);
};

export default Splash;
