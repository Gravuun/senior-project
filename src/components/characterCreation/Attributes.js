import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createChar } from "../../actions/projectActions.js";

/* 
Final page in current character creation.
User spends all of their attribute points in any of the specified fields
Special attribute points do not have to be exhausted

Upon submission the character is generated and the user is directed to the dashboard
*/

class Attributes extends Component {
	state = {
		toMagic: false,
		headRow: "headRow",
		newCharacter: {
			metatypePriority: "",
			attributePriority: "",
			magicPriority: "",
			skillPriority: "",
			resourcePriority: "",
			ap: 0,
			specialAP: 0,
			name: "",
			charID: 0,
			metatype: "",
			magicRole: "",
			attributes: {
				body: 0,
				bodyMax: 0,
				agility: 0,
				agilityMax: 0,
				reason: 0,
				reasonMax: 0,
				strength: 0,
				strengthMax: 0,
				will: 0,
				willMax: 0,
				logic: 0,
				logicMax: 0,
				intelligence: 0,
				intelligenceMax: 0,
				charisma: 0,
				charismaMax: 0,
				edge: 0,
				edgeMax: 0,
				essence: 0,
				initiative: 0,
				magic: 0,
				resonance: 0,
			},
			magic: [],
			skills: [],
			resources: 0,
		},
		bodyMin: 0,
		agilityMin: 0,
		reasonMin: 0,
		strengthMin: 0,
		willMin: 0,
		logicMin: 0,
		intelligenceMin: 0,
		charismaMin: 0,
		edgeMin: 0,
		magicMin: 0,
		resonanceMin: 0,
		priority: "",
	};

	finalizeChar = () => {
		this.props.createCharacter(this.state.newCharacter);
		this.props.history.push("/");
	};

	componentDidUpdate() {
		if (this.props.newCharacter.attributePriority !== this.state.priority) {
			this.handlePriority();
		}
	}

	/*
	Populate the Ability points based on chosen priority and Special Ability points based on metatype and metatype priority
	Also set base and max values of stats based on metatype and magic priority and role
	*/
	handlePriority = () => {
		let priority = this.props.newCharacter.attributePriority;
		let attributes = {};
		let ap = 0;
		let sp = this.props.newCharacter.specialAP;
		if (priority === "A") {
			ap = 24;
		} else if (priority === "B") {
			ap = 20;
		} else if (priority === "C") {
			ap = 16;
		} else if (priority === "D") {
			ap = 14;
		} else {
			ap = 12;
		}

		if (this.props.newCharacter.metatype === "Human") {
			attributes = {
				body: 1,
				bodyMax: 6,
				agility: 1,
				agilityMax: 6,
				reason: 1,
				reasonMax: 6,
				strength: 1,
				strengthMax: 6,
				will: 1,
				willMax: 6,
				logic: 1,
				logicMax: 6,
				intelligence: 1,
				intelligenceMax: 6,
				charisma: 1,
				charismaMax: 6,
				edge: 2,
				edgeMax: 7,
				essence: 6,
				initiative: 2,
				magic: this.props.newCharacter.attributes.magic,
				resonance: this.props.newCharacter.attributes.resonance,
			};
		} else if (this.props.newCharacter.metatype === "Elf") {
			attributes = {
				body: 1,
				bodyMax: 6,
				agility: 2,
				agilityMax: 7,
				reason: 1,
				reasonMax: 6,
				strength: 1,
				strengthMax: 6,
				will: 1,
				willMax: 6,
				logic: 1,
				logicMax: 6,
				intelligence: 1,
				intelligenceMax: 6,
				charisma: 3,
				charismaMax: 8,
				edge: 1,
				edgeMax: 6,
				essence: 6,
				initiative: 2,
				magic: this.props.newCharacter.attributes.magic,
				resonance: this.props.newCharacter.attributes.resonance,
			};
		} else if (this.props.newCharacter.metatype === "Dwarf") {
			attributes = {
				body: 3,
				bodyMax: 8,
				agility: 1,
				agilityMax: 6,
				reason: 1,
				reasonMax: 5,
				strength: 3,
				strengthMax: 8,
				will: 2,
				willMax: 7,
				logic: 1,
				logicMax: 6,
				intelligence: 1,
				intelligenceMax: 6,
				charisma: 1,
				charismaMax: 6,
				edge: 1,
				edgeMax: 6,
				essence: 6,
				initiative: 0,
				magic: this.props.newCharacter.attributes.magic,
				resonance: this.props.newCharacter.attributes.resonance,
			};
		} else if (this.props.newCharacter.metatype === "Ork") {
			attributes = {
				body: 4,
				bodyMax: 9,
				agility: 1,
				agilityMax: 6,
				reason: 1,
				reasonMax: 6,
				strength: 3,
				strengthMax: 8,
				will: 1,
				willMax: 6,
				logic: 1,
				logicMax: 5,
				intelligence: 1,
				intelligenceMax: 6,
				charisma: 1,
				charismaMax: 5,
				edge: 1,
				edgeMax: 6,
				essence: 6,
				initiative: 2,
				magic: this.props.newCharacter.attributes.magic,
				resonance: this.props.newCharacter.attributes.resonance,
			};
		} else if (this.props.newCharacter.metatype === "Troll") {
			attributes = {
				body: 5,
				bodyMax: 10,
				agility: 1,
				agilityMax: 5,
				reason: 1,
				reasonMax: 6,
				strength: 5,
				strengthMax: 10,
				will: 1,
				willMax: 6,
				logic: 1,
				logicMax: 5,
				intelligence: 1,
				intelligenceMax: 5,
				charisma: 1,
				charismaMax: 4,
				edge: 1,
				edgeMax: 6,
				essence: 6,
				initiative: 2,
				magic: this.props.newCharacter.attributes.magic,
				resonance: this.props.newCharacter.attributes.resonance,
			};
		}

		this.setState({
			...this.state.newCharacter,
			newCharacter: {
				...this.props.newCharacter,
				ap,
				attributes,
				specialAP: sp,
			},
			priority,
			bodyMin: attributes.body,
			agilityMin: attributes.agility,
			reasonMin: attributes.reason,
			strengthMin: attributes.strength,
			willMin: attributes.will,
			logicMin: attributes.logic,
			intelligenceMin: attributes.intelligence,
			charismaMin: attributes.charisma,
			edgeMin: attributes.edge,
			magicMin: attributes.magic,
			resonanceMin: attributes.resonance,
		});

		if (this.props.newCharacter.attributes.magic === 0) {
			document.getElementById("magicPlus").disabled = true;
		}
		if (this.props.newCharacter.attributes.resonance === 0) {
			document.getElementById("resonancePlus").disabled = true;
		}
	};

	// Increment selected stat and subtract 1 from ability point pool
	handleClickPlus = (e) => {
		if (this.state.newCharacter.ap === 0) {
			return;
		}
		let attr = e.target.name;
		let ap = this.state.newCharacter.ap - 1;
		let toMagic = ap === 0;

		if (
			attr === "body" &&
			this.state.newCharacter.attributes.body <
				this.state.newCharacter.attributes.bodyMax
		) {
			let body = this.state.newCharacter.attributes.body + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						body,
					},
				},
				toMagic,
			});
			if (body > this.state.bodyMin) {
				document.getElementById("bodyMinus").disabled = false;
				if (body === this.state.newCharacter.attributes.bodyMax) {
					document.getElementById("bodyPlus").disabled = true;
				}
			}
		} else if (
			attr === "agility" &&
			this.state.newCharacter.attributes.agility <
				this.state.newCharacter.attributes.agilityMax
		) {
			let agility = this.state.newCharacter.attributes.agility + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						agility,
					},
				},
				toMagic,
			});
			if (agility > this.state.agilityMin) {
				document.getElementById("agilityMinus").disabled = false;
				if (agility === this.state.newCharacter.attributes.agilityMax) {
					document.getElementById("agilityPlus").disabled = true;
				}
			}
		} else if (
			attr === "reason" &&
			this.state.newCharacter.attributes.reason <
				this.state.newCharacter.attributes.reasonMax
		) {
			let reason = this.state.newCharacter.attributes.reason + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						reason,
					},
				},
				toMagic,
			});
			if (reason > this.state.reasonMin) {
				document.getElementById("reasonMinus").disabled = false;
				if (reason === this.state.newCharacter.attributes.reasonMax) {
					document.getElementById("reasonPlus").disabled = true;
				}
			}
		} else if (
			attr === "strength" &&
			this.state.newCharacter.attributes.strength <
				this.state.newCharacter.attributes.strengthMax
		) {
			let strength = this.state.newCharacter.attributes.strength + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						strength,
					},
				},
				toMagic,
			});
			if (strength > this.state.strengthMin) {
				document.getElementById("strengthMinus").disabled = false;
				if (strength === this.state.newCharacter.attributes.strengthMax) {
					document.getElementById("strengthPlus").disabled = true;
				}
			}
		} else if (
			attr === "will" &&
			this.state.newCharacter.attributes.will <
				this.state.newCharacter.attributes.willMax
		) {
			let will = this.state.newCharacter.attributes.will + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						will,
					},
				},
				toMagic,
			});
			if (will > this.state.willMin) {
				document.getElementById("willMinus").disabled = false;
				if (will === this.state.newCharacter.attributes.willMax) {
					document.getElementById("willPlus").disabled = true;
				}
			}
		} else if (
			attr === "logic" &&
			this.state.newCharacter.attributes.logic <
				this.state.newCharacter.attributes.logicMax
		) {
			let logic = this.state.newCharacter.attributes.logic + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						logic,
					},
				},
				toMagic,
			});
			if (logic > this.state.logicMin) {
				document.getElementById("logicMinus").disabled = false;
				if (logic === this.state.newCharacter.attributes.logicMax) {
					document.getElementById("logicPlus").disabled = true;
				}
			}
		} else if (
			attr === "intelligence" &&
			this.state.newCharacter.attributes.intelligence <
				this.state.newCharacter.attributes.intelligenceMax
		) {
			let intelligence = this.state.newCharacter.attributes.intelligence + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						intelligence,
					},
				},
				toMagic,
			});
			if (intelligence > this.state.intelligenceMin) {
				document.getElementById("intelligenceMinus").disabled = false;
				if (
					intelligence === this.state.newCharacter.attributes.intelligenceMax
				) {
					document.getElementById("intelligencePlus").disabled = true;
				}
			}
		} else if (
			attr === "charisma" &&
			this.state.newCharacter.attributes.charisma <
				this.state.newCharacter.attributes.charismaMax
		) {
			let charisma = this.state.newCharacter.attributes.charisma + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						charisma,
					},
				},
				toMagic,
			});
			if (charisma > this.state.charismaMin) {
				document.getElementById("charismaMinus").disabled = false;
				if (charisma === this.state.newCharacter.attributes.charismaMax) {
					document.getElementById("charismaPlus").disabled = true;
				}
			}
		}
	};

	// Decrement selected stat and add 1 to the ability point pool
	handleClickMinus = (e) => {
		let attr = e.target.name;
		let ap = this.state.newCharacter.ap + 1;

		if (
			attr === "body" &&
			this.state.newCharacter.attributes.body > this.state.bodyMin
		) {
			let body = this.state.newCharacter.attributes.body - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						body,
					},
				},
				toMagic: false,
			});
			if (body < this.state.newCharacter.attributes.bodyMax) {
				document.getElementById("bodyPlus").disabled = false;
				if (body === this.state.bodyMin) {
					document.getElementById("bodyMinus").disabled = true;
				}
			}
		} else if (
			attr === "agility" &&
			this.state.newCharacter.attributes.agility > this.state.agilityMin
		) {
			let agility = this.state.newCharacter.attributes.agility - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						agility,
					},
				},
				toMagic: false,
			});
			if (agility < this.state.newCharacter.attributes.agilityMax) {
				document.getElementById("agilityPlus").disabled = false;
				if (agility === this.state.agilityMin) {
					document.getElementById("agilityMinus").disabled = true;
				}
			}
		} else if (
			attr === "reason" &&
			this.state.newCharacter.attributes.reason > this.state.reasonMin
		) {
			let reason = this.state.newCharacter.attributes.reason - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						reason,
					},
				},
				toMagic: false,
			});
			if (reason < this.state.newCharacter.attributes.reasonMax) {
				document.getElementById("reasonPlus").disabled = false;
				if (reason === this.state.reasonMin) {
					document.getElementById("reasonMinus").disabled = true;
				}
			}
		} else if (
			attr === "strength" &&
			this.state.newCharacter.attributes.strength > this.state.strengthMin
		) {
			let strength = this.state.newCharacter.attributes.strength - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						strength,
					},
				},
				toMagic: false,
			});
			if (strength < this.state.newCharacter.attributes.strengthMax) {
				document.getElementById("strengthPlus").disabled = false;
				if (strength === this.state.strengthMin) {
					document.getElementById("strengthMinus").disabled = true;
				}
			}
		} else if (
			attr === "will" &&
			this.state.newCharacter.attributes.will > this.state.willMin
		) {
			let will = this.state.newCharacter.attributes.will - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						will,
					},
				},
				toMagic: false,
			});
			if (will < this.state.newCharacter.attributes.willMax) {
				document.getElementById("willPlus").disabled = false;
				if (will === this.state.willMin) {
					document.getElementById("willMinus").disabled = true;
				}
			}
		} else if (
			attr === "logic" &&
			this.state.newCharacter.attributes.logic > this.state.logicMin
		) {
			let logic = this.state.newCharacter.attributes.logic - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						logic,
					},
				},
				toMagic: false,
			});
			if (logic < this.state.newCharacter.attributes.logicMax) {
				document.getElementById("logicPlus").disabled = false;
				if (logic === this.state.logicMin) {
					document.getElementById("logicMinus").disabled = true;
				}
			}
		} else if (
			attr === "intelligence" &&
			this.state.newCharacter.attributes.intelligence >
				this.state.intelligenceMin
		) {
			let intelligence = this.state.newCharacter.attributes.intelligence - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						intelligence,
					},
				},
				toMagic: false,
			});
			if (intelligence < this.state.newCharacter.attributes.intelligenceMax) {
				document.getElementById("intelligencePlus").disabled = false;
				if (intelligence === this.state.intelligenceMin) {
					document.getElementById("intelligenceMinus").disabled = true;
				}
			}
		} else if (
			attr === "charisma" &&
			this.state.newCharacter.attributes.charisma > this.state.charismaMin
		) {
			let charisma = this.state.newCharacter.attributes.charisma - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					ap,
					attributes: {
						...this.state.newCharacter.attributes,
						charisma,
					},
				},
				toMagic: false,
			});
			if (charisma < this.state.newCharacter.attributes.charismaMax) {
				document.getElementById("charismaPlus").disabled = false;
				if (charisma === this.state.charismaMin) {
					document.getElementById("charismaMinus").disabled = true;
				}
			}
		}
	};

	// Increment selected stat and subtract 1 from special ability point pool
	handleSpecialClickPlus = (e) => {
		if (this.state.newCharacter.specialAP === 0) {
			return;
		}
		let attr = e.target.name;
		let specialAP = this.state.newCharacter.specialAP - 1;

		if (
			attr === "edge" &&
			this.state.newCharacter.attributes.edge <
				this.state.newCharacter.attributes.edgeMax
		) {
			let edge = this.state.newCharacter.attributes.edge + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					specialAP,
					attributes: {
						...this.state.newCharacter.attributes,
						edge,
					},
				},
			});
			if (edge > this.state.edgeMin) {
				document.getElementById("edgeMinus").disabled = false;
				if (edge === this.state.newCharacter.attributes.edgeMax) {
					document.getElementById("edgePlus").disabled = true;
				}
			}
		} else if (attr === "magic") {
			let magic = this.state.newCharacter.attributes.magic + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					specialAP,
					attributes: {
						...this.state.newCharacter.attributes,
						magic,
					},
				},
			});
			if (magic > this.state.magicMin) {
				document.getElementById("magicMinus").disabled = false;
			}
		} else if (attr === "resonance") {
			let resonance = this.state.newCharacter.attributes.resonance + 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					specialAP,
					attributes: {
						...this.state.newCharacter.attributes,
						resonance,
					},
				},
			});
			if (resonance > this.state.resonanceMin) {
				document.getElementById("resonanceMinus").disabled = false;
			}
		}
	};

	// Decrement selected stat and add 1 to special ability point pool
	handleSpecialClickMinus = (e) => {
		let attr = e.target.name;
		let specialAP = this.state.newCharacter.specialAP + 1;

		if (
			attr === "edge" &&
			this.state.newCharacter.attributes.edge > this.state.edgeMin
		) {
			let edge = this.state.newCharacter.attributes.edge - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					specialAP,
					attributes: {
						...this.state.newCharacter.attributes,
						edge,
					},
				},
			});
			if (edge < this.state.newCharacter.attributes.edgeMax) {
				document.getElementById("edgePlus").disabled = false;
				if (edge === this.state.edgeMin) {
					document.getElementById("edgeMinus").disabled = true;
				}
			}
		} else if (
			attr === "magic" &&
			this.state.newCharacter.attributes.magic > this.state.magicMin
		) {
			let magic = this.state.newCharacter.attributes.magic - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					specialAP,
					attributes: {
						...this.state.newCharacter.attributes,
						magic,
					},
				},
			});
			if (magic === this.state.magicMin) {
				document.getElementById("magicMinus").disabled = true;
			}
		} else if (
			attr === "resonance" &&
			this.state.newCharacter.attributes.resonance > this.state.resonanceMin
		) {
			let resonance = this.state.newCharacter.attributes.resonance - 1;
			this.setState({
				newCharacter: {
					...this.state.newCharacter,
					specialAP,
					attributes: {
						...this.state.newCharacter.attributes,
						resonance,
					},
				},
			});
			if (resonance === this.state.resonanceMin) {
				document.getElementById("resonanceMinus").disabled = true;
			}
		}
	};

	render() {
		const { auth } = this.props;

		if (!auth.uid) return <Redirect to="/Welcome" />;
		return (
			<div className="Attributes">
				<h1 className="title has-text-centered">Set Attributes</h1>
				<h3 className="subtitle has-text-centered">
					Attribute Priority: {this.props.newCharacter.attributePriority}
				</h3>
				<table key={"metaTable"} className="table is-fullwidth">
					<thead key={"thead"}>
						<tr key={this.state.newCharacter.headRow}>
							<th key={"empty1"}></th>
							<th key={"attributeHeader"}>
								Attribute Points: {this.state.newCharacter.ap}
							</th>
							<th key={"empty2"}></th>
							<th key={"specialHeader"}>
								Special Attribute Points: {this.state.newCharacter.specialAP}
							</th>
						</tr>
					</thead>
					<tbody key={"tbody"}>
						<tr>
							<td>Body:</td>
							<td>
								<div className="field has-addons is-centered">
									<button
										className="button has-text-info"
										id="bodyMinus"
										name="body"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="body"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.body}
									</span>
									<button
										className="button has-text-info"
										id="bodyPlus"
										name="body"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="body"></i>
									</button>
								</div>
							</td>
							<td>Edge:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="edgeMinus"
										name="edge"
										onClick={this.handleSpecialClickMinus}
									>
										<i className="fas fa-minus" name="edge"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.edge}
									</span>
									<button
										className="button has-text-info"
										id="edgePlus"
										name="edge"
										onClick={this.handleSpecialClickPlus}
									>
										<i className="fas fa-plus" name="edge"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Agility:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="agilityMinus"
										name="agility"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="agility"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.agility}
									</span>
									<button
										className="button has-text-info"
										id="agilityPlus"
										name="agility"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="agility"></i>
									</button>
								</div>
							</td>
							<td>Magic:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="magicMinus"
										name="magic"
										onClick={this.handleSpecialClickMinus}
									>
										<i className="fas fa-minus" name="magic"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.magic}
									</span>
									<button
										className="button has-text-info"
										id="magicPlus"
										name="magic"
										onClick={this.handleSpecialClickPlus}
									>
										<i className="fas fa-plus" name="magic"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Reason:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="reasonMinus"
										name="reason"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="reason"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.reason}
									</span>
									<button
										className="button has-text-info"
										id="reasonPlus"
										name="reason"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="reason"></i>
									</button>
								</div>
							</td>
							<td>Resonance:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="resonanceMinus"
										name="resonance"
										onClick={this.handleSpecialClickMinus}
									>
										<i className="fas fa-minus" name="resonance"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.resonance}
									</span>
									<button
										className="button has-text-info"
										id="resonancePlus"
										name="resonance"
										onClick={this.handleSpecialClickPlus}
									>
										<i className="fas fa-plus" name="resonance"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Strength:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="strengthMinus"
										name="strength"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="strength"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.strength}
									</span>
									<button
										className="button has-text-info"
										id="strengthPlus"
										name="strength"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="strength"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Will:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="willMinus"
										name="will"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="will"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.will}
									</span>
									<button
										className="button has-text-info"
										id="willPlus"
										name="will"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="will"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Logic:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="logicMinus"
										name="logic"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="logic"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.logic}
									</span>
									<button
										className="button has-text-info"
										id="logicPlus"
										name="logic"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="logic"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Intelligence:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="intelligenceMinus"
										name="intelligence"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="intelligence"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.intelligence}
									</span>
									<button
										className="button has-text-info"
										id="intelligencePlus"
										name="intelligence"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="intelligence"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Charisma:</td>
							<td>
								<div className="field has-addons">
									<button
										className="button has-text-info"
										id="charismaMinus"
										name="charisma"
										onClick={this.handleClickMinus}
									>
										<i className="fas fa-minus" name="charisma"></i>
									</button>
									<span className="button is-static">
										{this.state.newCharacter.attributes.charisma}
									</span>
									<button
										className="button has-text-info"
										id="charismaPlus"
										name="charisma"
										onClick={this.handleClickPlus}
									>
										<i className="fas fa-plus" name="charisma"></i>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>

				<div className="level headroom">
					<Link to="/Metatype">
						<button className="button is-primary level-left">
							&laquo; Metatype
						</button>
					</Link>

					<button
						className="button is-primary level-right"
						disabled={!this.state.toMagic}
						onClick={this.finalizeChar}
					>
						Create Character &raquo;
					</button>
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
		createCharacter: (character) => dispatch(createChar(character)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
