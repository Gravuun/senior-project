/* 
Sign In action calls the login function and passes the email and password as credentials
Upon success the user is routed to the character viewing screen
Upon failure the user stays on the sign in page and the firbase auth error is printed out
*/
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

/* 
Sign out call the firebase logout function, not arguements necessary
*/
export const signOut = () => {
	return (dispatch, getState, getFirbase) => {
		const firebase = getFirbase();

		firebase.logout().then(() => {
			dispatch({ type: "SIGNOUT_SUCCESS" });
		});
	};
};

/* 
Sign up function creates a new user in firebase auth and then takes
the generated user id and creates a profile entry in the users collection of
firestore

Upon success the user is routed to the character viewing screen
Upon failure the user stays on the sign in page and the firbase auth error is printed out

Firebase auth provides email checking and rudimentary password requirements
*/
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
