import authReducer from "./authReducer";
import characterCreatorReducer from "./characterCreatorReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

// Root reducer gives access to auth and character creator reduces along with
// the firebasestoreReducer and firestoreReducer from their respective packages
const rootReducer = combineReducers({
	auth: authReducer,
	characterCreator: characterCreatorReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
