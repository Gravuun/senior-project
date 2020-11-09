import React, { Component } from "react";

class CreateChar extends Component {
	state = {
		name: null,
		class: "Warrior",
		level: 1,
	};
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addChar(this.state);
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" onChange={this.handleChange} />
					<label htmlFor="class">Class:</label>
					<select name="classes" id="class" onChange={this.handleChange}>
						<option value="Warrior">Warrior</option>
						<option value="Rogue">Rogue</option>
						<option value="Mage">Mage</option>
					</select>
					<label htmlFor="level">Level:</label>
					<input
						type="number"
						id="level"
						max="20"
						min="1"
						onChange={this.handleChange}
					/>
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

export default CreateChar;
