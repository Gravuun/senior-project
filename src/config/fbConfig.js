import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBuA4JzB57ZeD_jDgc8EL8Ixr7GuXFG118",
	authDomain: "sr-manager-293af.firebaseapp.com",
	databaseURL: "https://sr-manager-293af.firebaseio.com",
	projectId: "sr-manager-293af",
	storageBucket: "sr-manager-293af.appspot.com",
	messagingSenderId: "515900190235",
	appId: "1:515900190235:web:56272603c2846058b3d2be",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
