const initState = {
	authError: null,
};

// The authentication reducer which changes the redux store state based on the action type
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_ERROR":
			return {
				...state,
				authError: "Login failed",
			};
		case "LOGIN_SUCCESS":
			return {
				...state,
				authError: null,
			};
		case "SIGNOUT_SUCCESS":
			return state;
		case "SIGNUP_SUCCESS":
			return {
				...state,
				authError: null,
			};
		case "SIGNUP_ERROR":
			return {
				...state,
				authError: action.err.message,
			};
		default:
			return state;
	}
};

export default authReducer;
