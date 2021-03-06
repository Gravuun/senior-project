/*
Adds a new fully populated character to the characters collection in firestore
The character is also associated with the user by adding the user's id to the character
*/
export const createChar = (character) => {
	return (dispatch, getState, getFirebase) => {
		const fireStore = getFirebase();
		const userID = getState().firebase.auth.uid;
		fireStore
			.firestore()
			.collection("characters")
			.add({
				name: character.name,
				user: userID,
				metatype: character.metatype,
				magicRole: character.magicRole,
				attributes: character.attributes,
				resources: character.resources,
				createdAt: new Date(),
			})
			.then(() => {
				dispatch({ type: "CREATE_CHAR", character });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_CHAR_ERROR", err });
			});
	};
};
