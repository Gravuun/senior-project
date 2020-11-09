import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../actions/authActions";

/*
Sign up page asks for the user's first name, last name, email, and password
Email is weakly checked for validity and upon pass a checkmark is dispalyed

Password is not check at all on client side, firebase auth provides rudimentary complexity requirements when this is
submitted in projectActions.js
*/
class SignUp extends Component {
	state = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	};

	validateEmail(email) {
		const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return re.test(String(email).toLowerCase());
	}

	handleChange = (e) => {
		if (e.target.id === "email") {
			if (this.validateEmail(e.target.value)) {
				document.getElementById("check").classList.remove("hidden");
			} else {
				document.getElementById("check").classList.add("hidden");
			}
		}
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signUp(this.state);
	};

	render() {
		const { authError, auth } = this.props;

		if (auth.uid) return <Redirect to="/" />;

		return (
			<div className="columns">
				<div className="column is-offset-one-quarter is-half">
					<form onSubmit={this.handleSubmit} className="has-text-centered">
						<h5 className="title">Sign Up</h5>
						<div className="field">
							<div className="control">
								<input
									className="input"
									type="text"
									placeholder="First Name"
									id="firstName"
									onChange={this.handleChange}
								/>
							</div>
							<div className="control">
								<input
									className="input"
									type="text"
									placeholder="Last Name"
									id="lastName"
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="field">
							<p className="control has-icons-left has-icons-right">
								<input
									className="input"
									type="email"
									placeholder="Email"
									id="email"
									onChange={this.handleChange}
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-envelope"></i>
								</span>
								<span className="icon is-small is-right hidden" id="check">
									<i className="fas fa-check has-text-success"></i>
								</span>
							</p>
							<p className="control has-icons-left">
								<input
									className="input"
									type="password"
									placeholder="Password"
									id="password"
									onChange={this.handleChange}
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-lock"></i>
								</span>
							</p>
						</div>
						<button className="button is-info">Login</button>
					</form>

					<div className="has-text-danger">
						{authError ? <p>{authError}</p> : null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
