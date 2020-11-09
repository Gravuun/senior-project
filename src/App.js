import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import UserChars from "./components/UserChars";
import Character from "./components/Character";
import Splash from "./components/Splash";
import Metatype from "./components/characterCreation/Metatype";
import Attributes from "./components/characterCreation/Attributes";
import PriorityTable from "./components/characterCreation/PriorityTable";
import { BrowserRouter, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import "./css/styles.css";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

// Function that stalls rendering with a splash screen while authentication is being checked
function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <div>splash screen...</div>;
	return children;
}

class App extends Component {
	render() {
		return (
			// Routing tags that defines urls for components so that pages may be loaded
			<BrowserRouter>
				<AuthIsLoaded>
					<div className="App">
						<NavBar />
						<Route exact path="/" component={UserChars} />
						<Route path="/character/:id" component={Character} />
						<Route path="/PriorityTable" component={PriorityTable} />
						<Route path="/Metatype" component={Metatype} />
						<Route path="/Attributes" component={Attributes} />
						<Route path="/SignIn" component={SignIn} />
						<Route path="/SignUp" component={SignUp} />
						<Route path="/Welcome" component={Splash} />
					</div>
				</AuthIsLoaded>
			</BrowserRouter>
		);
	}
}

export default App;
