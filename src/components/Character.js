import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Character extends Component {
	render() {
		const { character, auth } = this.props;

		if (!auth.uid) return <Redirect to="/Welcome" />;

		if (character) {
			return (
				<div>
					<h1 className="title has-text-centered">{character.name}</h1>
					<h3 className="subtitle has-text-centered">
						{character.metatype} {character.magicRole}
					</h3>

					<table key={"metaTable"} className="table is-fullwidth">
						<tbody key={"tbody"}>
							<tr>
								<td>Body:</td>
								<td>
									<span className="button is-static">
										{character.attributes.body}/{character.attributes.bodyMax}
									</span>
								</td>
								<td>Edge:</td>
								<td>
									<span className="button is-static">
										{character.attributes.edge}/{character.attributes.edgeMax}
									</span>
								</td>
							</tr>
							<tr>
								<td>Agility:</td>
								<td>
									<span className="button is-static">
										{character.attributes.agility}/
										{character.attributes.agilityMax}
									</span>
								</td>
								<td>Magic:</td>
								<td>
									<span className="button is-static">
										{character.attributes.magic}
									</span>
								</td>
							</tr>
							<tr>
								<td>Reason:</td>
								<td>
									<span className="button is-static">
										{character.attributes.reason}/
										{character.attributes.reasonMax}
									</span>
								</td>
								<td>Resonance:</td>
								<td>
									<span className="button is-static">
										{character.attributes.resonance}
									</span>
								</td>
							</tr>
							<tr>
								<td>Strength:</td>
								<td>
									<span className="button is-static">
										{character.attributes.strength}/
										{character.attributes.strengthMax}
									</span>
								</td>
							</tr>
							<tr>
								<td>Will:</td>
								<td>
									<span className="button is-static">
										{character.attributes.will}/{character.attributes.willMax}
									</span>
								</td>
							</tr>
							<tr>
								<td>Logic:</td>
								<td>
									<span className="button is-static">
										{character.attributes.logic}/{character.attributes.logicMax}
									</span>
								</td>
							</tr>
							<tr>
								<td>Intelligence:</td>
								<td>
									<span className="button is-static">
										{character.attributes.intelligence}/
										{character.attributes.intelligenceMax}
									</span>
								</td>
							</tr>
							<tr>
								<td>Charisma:</td>
								<td>
									<span className="button is-static">
										{character.attributes.charisma}/
										{character.attributes.charismaMax}
									</span>
								</td>
								<td>Resources:</td>
								<td>{character.resources}&yen;</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else {
			return (
				<div>
					<h1 className="title is-centered">Loading Data..</h1>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const characters = state.firestore.data.characters;
	const character = characters ? characters[id] : null;
	return {
		character: character,
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(() => ["characters"])
)(Character);
