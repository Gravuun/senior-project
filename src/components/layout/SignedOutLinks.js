import React, { Component } from "react";
import { NavLink } from "react-router-dom";

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
