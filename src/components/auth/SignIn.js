import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions/authActions";
import { Redirect } from "react-router-dom";

/*
Sign in page asks for the user's email and password
Email is weakly checked for validity and upon pass a checkmark is dispalyed

Password is not check at all on client side, firebase auth handles that in projectActions.js
*/
class SignIn extends Component {
	state = {
		email: "",
		password: "",
	};

	validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
		this.props.signIn(this.state);
	};

	render() {
		const { authError, auth } = this.props;

		if (auth.uid) return <Redirect to="/" />;

		return (
			<div className="column">
				<div className="column is-offset-one-quarter is-half">
					<form
						onSubmit={this.handleSubmit}
						className="white has-text-centered"
					>
						<h5 className="title">Sign In</h5>
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
						</div>
						<div className="field">
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
						<button type="submit" className="button is-info">
							Login
						</button>
						<div className="has-text-danger">
							{authError ? <p>{authError}</p> : null}
						</div>
					</form>
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
		signIn: (creds) => dispatch(signIn(creds)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
