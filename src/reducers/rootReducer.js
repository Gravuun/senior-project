import authReducer from "./authReducer";
import characterCreatorReducer from "./characterCreatorReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
	auth: authReducer,
	characterCreator: characterCreatorReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
