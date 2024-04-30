// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoL3lieY6w9DHOwKbvN47O3_2Vu9bV3ck",
  authDomain: "allblog-eeda6.firebaseapp.com",
  projectId: "allblog-eeda6",
  storageBucket: "allblog-eeda6.appspot.com",
  messagingSenderId: "1078592214842",
  appId: "1:1078592214842:web:b20a1cab4dd91a657da203",
  measurementId: "G-0ZY095WXK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const getUserInfo = () => {
    const _auth = getAuth();
    const userInfo = {userId: "", loggedIn: false};
    onAuthStateChanged(_auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            userInfo.userId = user.uid;
            userInfo.loggedIn = true;
        } else {
            // User is signed out
            userInfo.userId = "";
            userInfo.loggedIn = true;
        }
    });
    return userInfo;
}

export { auth, provider, app, getUserInfo };