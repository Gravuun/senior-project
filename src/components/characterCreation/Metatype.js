import React, { Component } from "react";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/*
Populate possible metatypes and magic roles based on chosen priority values
*/
class Metatype extends Component {
	state = {
		options: [{ metatype: "Human", points: 1 }],
		choices: [
			{ value: "A", label: "A" },
			{ value: "B", label: "B" },
			{ value: "C", label: "C" },
			{ value: "D", label: "D" },
			{ value: "E", label: "E" },
		],
		headRow: "headRow",
		optionsList: [],
		metaPriority: "",
		magicPriority: "",
		roles: [],
		rolesList: [],
		selectedRole: { value: "-", label: "-" },
		magic: 0,
		resonance: 0,
		metatype: "",
		specialAP: 0,
	};

	componentDidMount() {
		if (
			this.props.metatypePriority !== this.state.metaPriority ||
			this.props.magicPriority !== this.state.magicPriority
		) {
			this.handlePriority();
		}
	}

	componentDidUpdate() {
		if (
			this.props.metatypePriority !== this.state.metaPriority ||
			this.props.magicPriority !== this.state.magicPriority
		) {
			this.handlePriority();
		}
	}

	componentWillUnmount() {
		if (this.state.roles === undefined || this.state.roles.length === 0) return;
		const chosen = this.state.roles.find(
			(role) => role.id === this.state.selectedRole.value
		);
		this.props.setMetatype(
			this.state.metatype,
			this.state.specialAP,
			chosen.role,
			this.state.magic,
			this.state.resonance
		);
	}

	handlePriority = () => {
		let metaPriority = this.props.metatypePriority;
		let magicPriority = this.props.magicPriority;
		let options = [];
		let roles = [];
		if (metaPriority === "A") {
			options = [
				{ metatype: "Human", points: 9, id: "1a" },
				{ metatype: "Elf", points: 8, id: "2a" },
				{ metatype: "Dwarf", points: 7, id: "3a" },
				{ metatype: "Ork", points: 7, id: "4a" },
				{ metatype: "Troll", points: 5, id: "5a" },
			];
		} else if (metaPriority === "B") {
			options = [
				{ metatype: "Human", points: 7, id: "1b" },
				{ metatype: "Elf", points: 6, id: "2b" },
				{ metatype: "Dwarf", points: 4, id: "3b" },
				{ metatype: "Ork", points: 4, id: "4b" },
				{ metatype: "Troll", points: 0, id: "5b" },
			];
		} else if (metaPriority === "C") {
			options = [
				{ metatype: "Human", points: 5, id: "1c" },
				{ metatype: "Elf", points: 3, id: "2c" },
				{ metatype: "Dwarf", points: 1, id: "3c" },
				{ metatype: "Ork", points: 0, id: "4c" },
			];
		} else if (metaPriority === "D") {
			options = [
				{ metatype: "Human", points: 3, id: "1d" },
				{ metatype: "Elf", points: 0, id: "2d" },
			];
		} else {
			options = [{ metatype: "Human", points: 1, id: "1e" }];
		}

		if (magicPriority === "A") {
			roles = [
				{ role: "Magician", magic: 6, resonance: 0, id: "m1a" },
				{ role: "Mystic Adept", magic: 6, resonance: 0, id: "m1a2" },
				{ role: "Technomancer", magic: 0, resonance: 6, id: "m2a" },
			];
		} else if (magicPriority === "B") {
			roles = [
				{ role: "Magician", magic: 4, resonance: 0, id: "m1b" },
				{ role: "Mystic Adept", magic: 4, resonance: 0, id: "m1b2" },
				{ role: "Technomancer", magic: 0, resonance: 4, id: "m2b" },
				{ role: "Adept", magic: 6, resonance: 0, id: "m3b" },
				{ role: "Aspected Magician", magic: 5, resonance: 0, id: "m4b" },
			];
		} else if (magicPriority === "C") {
			roles = [
				{ role: "Magician", magic: 3, resonance: 0, id: "m1c" },
				{ role: "Mystic Adept", magic: 3, resonance: 0, id: "m1c2" },
				{ role: "Technomancer", magic: 0, resonance: 3, id: "m2c" },
				{ role: "Adept", magic: 4, resonance: 0, id: "m3c" },
				{ role: "Aspected Magician", magic: 3, resonance: 0, id: "m4c" },
			];
		} else if (magicPriority === "D") {
			roles = [
				{ role: "Adept", magic: 2, resonance: 0, id: "m1d" },
				{ role: "Aspected Magician", magic: 2, resonance: 0, id: "m2d" },
			];
		} else {
			roles = [{ role: "-", magic: 0, resonance: 0, id: "m1e" }];
		}

		this.setState({
			...this.state,
			options,
			metaPriority,
			magicPriority,
			roles,
			optionsList: options.map((picked) => {
				return (
					<tr key={picked.id}>
						<td key={picked.id + "rcell"}>
							<input
								type="radio"
								name="meta"
								id={picked.id}
								onChange={this.handleRadio}
							/>
						</td>
						<td key={picked.id + "mcell"}>{picked.metatype}</td>
						<td key={picked.id + "pcell"}>{picked.points}</td>
					</tr>
				);
			}),
			rolesList: roles.map((picked) => {
				return {
					value: picked.id,
					label:
						picked.role +
						" Magic: " +
						picked.magic +
						" Resonance: " +
						picked.resonance,
				};
			}),
			selectedRole: {
				value: roles[0].id,
				label:
					roles[0].role +
					" Magic: " +
					roles[0].magic +
					" Resonance: " +
					roles[0].resonance,
			},
			magic: roles[0].magic,
			resonance: roles[0].resonance,
		});
	};

	handleClick() {
		this.props.history.push("/Attributes");
	}

	handleChange = (selectedRole) => {
		if (selectedRole) {
			let stats = this.state.roles.find((role) => {
				return selectedRole.value === role.id;
			});
			this.setState({
				...this.state,
				selectedRole: selectedRole,
				magic: stats.magic,
				resonance: stats.resonance,
			});
		}
	};

	handleRadio = (selectedRadio) => {
		if (selectedRadio) {
			let choice = this.state.options.find((pick) => {
				return selectedRadio.target.id === pick.id;
			});
			this.setState({
				...this.state,
				metatype: choice.metatype,
				specialAP: choice.points,
			});
		}
	};

	render() {
		const { auth } = this.props;

		if (!auth.uid) return <Redirect to="/Welcome" />;
		return (
			<div className="metatypes">
				<h1 className="title has-text-centered">
					Choose Metatype and Magic role
				</h1>
				<h3 className="subtitle has-text-centered">
					Metatype Priority: {this.state.metaPriority}
				</h3>
				<table
					key={"metaTable"}
					className="table is-fullwidth has-text-centered"
				>
					<thead key={"thead"}>
						<tr key={this.state.headRow}>
							<th key={"buttonHeader"}></th>
							<th key={"metaHeader"}>Metatype</th>
							<th key={"pointHeader"}>Special Attribute Points</th>
						</tr>
					</thead>
					<tbody key={"tbody"}>{this.state.optionsList}</tbody>
				</table>

				<h3 className="subtitle has-text-centered">
					Magic/Resonance Priority: {this.state.magicPriority}
				</h3>
				<div className="field">
					<label htmlFor="Magic" className="label">
						Choose Magic or Resonance Role:
					</label>
					<Select
						className="Magic"
						value={this.state.selectedRole}
						onChange={this.handleChange}
						options={this.state.rolesList}
					/>
				</div>

				<div className="headroom level">
					<Link to="/PriorityTable">
						<button className="button is-primary level-left">
							&laquo; PriorityTable
						</button>
					</Link>

					<Link to="/Attributes">
						<button className="button is-primary level-right">
							Attributes &raquo;
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		metatypePriority: state.characterCreator.newCharacter.metatypePriority,
		magicPriority: state.characterCreator.newCharacter.magicPriority,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setMetatype: (metatype, specialAP, magicRole, magic, resonance) => {
			dispatch({
				type: "METATYPE",
				metatype,
				specialAP,
				magicRole,
				magic,
				resonance,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Metatype);
