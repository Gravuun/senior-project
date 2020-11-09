export const signIn = (credentials) => {
	return (dispatch, getState, getFirebase) => {
		const firebase = getFirebase();

		firebase
			.login(credentials)
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, getFirbase) => {
		const firebase = getFirbase();

		firebase.logout().then(() => {
			dispatch({ type: "SIGNOUT_SUCCESS" });
		});
	};
};

export const signUp = (newUser) => {
	return (dispatch, getState, getFirbase) => {
		const firebase = getFirbase();
		const firestore = firebase.firestore();

		firebase
			.createUser({ email: newUser.email, password: newUser.password })
			.then(() => {
				firebase.auth().onAuthStateChanged((user) => {
					return firestore.collection("users").doc(user.uid).set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
					});
				});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "SIGNUP_ERROR", err });
			});
	};
};
