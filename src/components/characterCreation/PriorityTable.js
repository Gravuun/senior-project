import React, { Component } from "react";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PriorityTable extends Component {
	state = {
		name: "",
		metatypeP: "",
		attributeP: "",
		magicP: "",
		skillsP: "",
		resourcesP: "",
		choices: [
			{ value: "-", label: "-", disabled: "no" },
			{ value: "A", label: "A", disabled: "no" },
			{ value: "B", label: "B", disabled: "no" },
			{ value: "C", label: "C", disabled: "no" },
			{ value: "D", label: "D", disabled: "no" },
			{ value: "E", label: "E", disabled: "no" },
		],
		toMetatype_table: false,
		toMetatype_name: false,
		toMetatype: false,
	};

	componentWillUnmount() {
		let resources = 0;
		if (this.state.resourcesP === "A") {
			resources = 450000;
		} else if (this.state.resourcesP === "B") {
			resources = 275000;
		} else if (this.state.resourcesP === "C") {
			resources = 140000;
		} else if (this.state.resourcesP === "D") {
			resources = 50000;
		} else if (this.state.resourcesP === "E") {
			resources = 6000;
		}
		this.props.populateTable(
			this.state.name,
			this.state.metatypeP,
			this.state.attributeP,
			this.state.magicP,
			this.state.skillsP,
			this.state.resourcesP,
			resources
		);
	}

	handleName = (e) => {
		if (e.target.value !== "") {
			let name = e.target.value;
			this.setState({ ...this.state, name, toMetatype_name: true });
		} else {
			this.setState({ ...this.state, name: "", toMetatype_name: false });
		}
	};

	handleChange(e, selector) {
		if (selector === "metatype-selector") {
			if (this.state.metatypeP !== "") {
				const choices = this.state.choices.map((option) => {
					if (option.value === this.state.metatypeP) {
						option.disabled = "no";
					}
					return option;
				});
				this.setState({
					choices,
				});
			}
			this.setState({
				metatypeP: e.value,
			});
		} else if (selector === "attribute-selector") {
			if (this.state.attributeP !== "") {
				const choices = this.state.choices.map((option) => {
					if (option.value === this.state.attributeP) {
						option.disabled = "no";
					}
					return option;
				});
				this.setState({
					choices,
				});
			}
			this.setState({
				attributeP: e.value,
			});
		} else if (selector === "magic-selector") {
			if (this.state.magicP !== "") {
				const choices = this.state.choices.map((option) => {
					if (option.value === this.state.magicP) {
						option.disabled = "no";
					}
					return option;
				});
				this.setState({
					choices,
				});
			}
			this.setState({
				magicP: e.value,
			});
		} else if (selector === "skills-selector") {
			if (this.state.skillsP !== "") {
				const choices = this.state.choices.map((option) => {
					if (option.value === this.state.skillsP) {
						option.disabled = "no";
					}
					return option;
				});
				this.setState({
					choices,
				});
			}
			this.setState({
				skillsP: e.value,
			});
		} else if (selector === "resources-selector") {
			if (this.state.resourcesP !== "") {
				const choices = this.state.choices.map((option) => {
					if (option.value === this.state.resourcesP) {
						option.disabled = "no";
					}
					return option;
				});
				this.setState({
					choices,
				});
			}
			this.setState({
				resourcesP: e.value,
			});
		}

		let count_disabled = 0;

		const disabled_choice = this.state.choices.map((option) => {
			if (option.value === e.value && option.value !== "-") {
				option.disabled = "yes";
			}
			if (option.disabled === "yes") {
				count_disabled += 1;
			}
			return option;
		});

		if (count_disabled === 5) {
			this.setState({
				choices: disabled_choice,
				toMetatype_table: true,
			});
		} else {
			this.setState({
				choices: disabled_choice,
				toMetatype_table: false,
			});
		}
	}

	render() {
		const { auth } = this.props;

		if (!auth.uid) return <Redirect to="/Welcome" />;
		return (
			<div className="priority-selector">
				<h1 className="title has-text-centered">Start Your Character:</h1>
				<div className="columns">
					<div className="field is-horizontal column is-half is-offset-one-quarter">
						<label htmlFor="name" className="field-label">
							Name:{" "}
						</label>
						<input
							type="text"
							className="field-body control field"
							id="name"
							onChange={this.handleName}
						/>
					</div>
				</div>
				<div className="table-container">
					<table className="table is-fullwidth">
						<thead>
							<tr>
								<th>
									<label htmlFor="metatype">Name:</label>
									<Select
										className="metatype-selector"
										id="metatype"
										isOptionDisabled={(option) => option.disabled === "yes"}
										options={this.state.choices}
										onChange={(e) => this.handleChange(e, "metatype-selector")}
									/>
								</th>
								<th>
									<label htmlFor="attribute">Attribute:</label>
									<Select
										className="attribute-selector"
										id="attribute"
										options={this.state.choices}
										isOptionDisabled={(option) => option.disabled === "yes"}
										onChange={(e) => this.handleChange(e, "attribute-selector")}
									/>
								</th>
								<th>
									<label htmlFor="magic">Magic:</label>
									<Select
										className="magic-selector"
										id="magic"
										options={this.state.choices}
										isOptionDisabled={(option) => option.disabled === "yes"}
										onChange={(e) => this.handleChange(e, "magic-selector")}
									/>
								</th>
								<th>
									<label htmlFor="skills">Skills:</label>
									<Select
										className="skills-selector"
										id="skills"
										options={this.state.choices}
										isOptionDisabled={(option) => option.disabled === "yes"}
										onChange={(e) => this.handleChange(e, "skills-selector")}
									/>
								</th>
								<th>
									<label htmlFor="resources">Resources:</label>
									<Select
										className="resources-selector"
										id="resources"
										options={this.state.choices}
										isOptionDisabled={(option) => option.disabled === "yes"}
										onChange={(e) => this.handleChange(e, "resources-selector")}
									/>
								</th>
							</tr>
						</thead>
						<tbody className="has-text-justified">
							<tr className="row-A has-text-centered">
								<td id="metatype-A">
									Human(9) <br /> Elf(8)
									<br /> Dwarf(7)
									<br /> Ork(7)
									<br /> Troll(5)
								</td>
								<td id="attribute-A">24</td>
								<td id="magic-A">
									Magician or Mystic Adept: Magic 6, two Rating 5 Magical
									skills, 10 spells <br />
									Technomancer: Resonance 6, two Rating 5 Resonance skills, 5
									complex forms
								</td>
								<td id="skills-A">46/10</td>
								<td id="resources-A">450,000&yen;</td>
							</tr>
							<tr className="row-B has-text-centered">
								<td id="metatype-B">
									Human(7) <br />
									Elf(6) <br />
									Dwarf(4) <br />
									Ork(4) <br />
									Troll(0)
								</td>
								<td id="attribute-B">20</td>
								<td id="magic-B">
									Magician or Mystic Adept: Magic 4, two Rating 4 Magical
									skills, 7 spells <br />
									Technomancer: Resonance 4, two Rating 4 Resonance skills, 2
									complex forms <br />
									Adept: Magic 6, one Rating 4 Active skill <br />
									Aspected Magician: Magic 5, one Rating 4 Magical skill group
								</td>
								<td id="skills-B">36/5</td>
								<td id="resources-B">275,000&yen;</td>
							</tr>
							<tr className="row-C has-text-centered">
								<td id="metatype-C">
									Human(5)
									<br /> Elf(3)
									<br /> Dwarf(1)
									<br /> Ork(0)
								</td>
								<td id="attribute-C">16</td>
								<td id="magic-C">
									Magician or Mystic Adept: Magic 3, 5 spells
									<br /> Technomancer: Resonance 3, 1 complex form <br />
									Adept: Magic 4, one Rating 2 Active skill <br />
									Aspected Magician: Magic 3, one Rating 2 Magical skill group
								</td>
								<td id="skills-C">28/2</td>
								<td id="resources-C">140,000&yen;</td>
							</tr>
							<tr className="row-D has-text-centered">
								<td id="metatype-D">
									Human(3) <br />
									Elf(0)
								</td>
								<td id="attribute-D">14</td>
								<td id="magic-D">
									Adept: Magic 2 <br />
									Aspected Magician: Magic 2
								</td>
								<td id="skills-D">22/0</td>
								<td id="resources-D">50,000&yen;</td>
							</tr>
							<tr className="row-E has-text-centered">
								<td id="metatype-E">Human(1)</td>
								<td id="attribute-E">12</td>
								<td id="magic-E">-</td>
								<td id="skills-E">18/0</td>
								<td id="resources-E">6,000&yen;</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="level headroom">
					<div className="level-left"></div>
					<Link to="/Metatype">
						<button
							className="button is-primary level-item level-right"
							id="to-metatype"
							disabled={
								!(this.state.toMetatype_table && this.state.toMetatype_name)
							}
						>
							Metatype &raquo;
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		newCharacter: state.characterCreator.newCharacter,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		populateTable: (
			name,
			metatype,
			attribute,
			magic,
			skills,
			resourcePriority,
			resources
		) => {
			dispatch({
				type: "POPULATE_TABLE",
				name: name,
				metatypePriority: metatype,
				attributePriority: attribute,
				magicPriority: magic,
				skillPriority: skills,
				resourcePriority: resourcePriority,
				resources: resources,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PriorityTable);
