import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import logo from "../../img/Shadowrun-logo.png";
import { connect } from "react-redux";

// Display nav bar at top of window
class NavBar extends Component {
	render() {
		const { auth, name } = this.props;

		// If youser is logged in shoe SignedInLinks component, else display SignOutLinks component
		const links = auth.uid ? <SignedInLinks name={name} /> : <SignedOutLinks />;

		return (
			<nav className="navbar" role="navigation">
				<div className="navbar-brand">
					<Link className="navbar-item" to="/">
						<img src={logo} alt="Shadowrun Character Creator" />
					</Link>
				</div>
				{links}
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		name: state.firebase.profile.firstName,
	};
};

export default connect(mapStateToProps)(NavBar);
