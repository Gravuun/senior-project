import React, { Component } from "react";
import CharList from "./CharList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

/* 
Dashboard where the user can see a button to create a character and their already created characters
*/
class UserChars extends Component {
	render() {
		const { auth } = this.props;

		if (!auth.uid) return <Redirect to="/Welcome" />;
		return (
			<div className="UserChars">
				<Link to="/PriorityTable" className="icon has-text-primary is-large">
					<i className="fas fa-plus-square fa-3x"></i>
				</Link>
				<table className="table is-fullwidth has-text-centered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Class</th>
						</tr>
					</thead>
					<CharList characters={this.props.characters} user={auth.uid} />
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		newCharacter: state.newCharacter,
		characters: state.firestore.ordered.characters,
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(() => ["characters"])
)(UserChars);
