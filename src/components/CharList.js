import React from "react";
import { useHistory } from "react-router-dom";

const CharList = (props) => {
	const { characters, user } = props;

	const history = useHistory();

	if (!characters) {
		return <tbody className="char-list"></tbody>;
	}

	const handleRowClick = (id) => {
		history.push("/character/" + id);
	};

	const charList = characters.map((char) => {
		if (char.user === user) {
			return (
				<tr
					className="char is-hover"
					key={char.id}
					onClick={() => handleRowClick(char.id)}
				>
					<td>{char.name}</td>
					<td>{char.metatype}</td>
				</tr>
			);
		}
	});

	return <tbody className="char-list">{charList}</tbody>;
};

export default CharList;
