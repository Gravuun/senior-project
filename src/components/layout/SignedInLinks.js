import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

class SignedInLinks extends Component {
	render() {
		return (
			<div className="navbar-menu">
				<div className="navbar-start">
					<div className="navbar-item">
						<NavLink to="/PriorityTable">
							<strong>Create Character</strong>
						</NavLink>
					</div>
				</div>
				<div className="navbar-end">
					<div className="navbar-item">Hello, {this.props.name}</div>
					<div className="navbar-item">
						<button className="button is-warning" onClick={this.props.signOut}>
							Log Out
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
