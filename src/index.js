import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer.js";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import firebase from "./config/fbConfig.js";

// Create Redux store with thunk middleware that allows the passing of firebase to actions
const store = createStore(
	rootReducer,
	applyMiddleware(thunk.withExtraArgument(getFirebase))
);

// Config for react-redux-firebase saying that userProfiles are stored in the "users" collection in firestore and that firestore should hold profiles
const rrfConfig = { userProfile: "users", useFirestoreForProfile: true };

// Props to be passed to react-redux-firebase
const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

// Base render method that supplies App with the Redux store and firebase access
ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
