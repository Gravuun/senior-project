import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// If user is not signed in only display sign up or sign in links
class SignedOutLinks extends Component {
	render() {
		return (
			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<NavLink className="button is-primary" to="/SignUp">
								<strong>Sign up</strong>
							</NavLink>
							<NavLink className="button is-light" to="/SignIn">
								Log in
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SignedOutLinks;
