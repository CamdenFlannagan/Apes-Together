import React from "react";
import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { provider, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function SignUp() {
    const [ emailInput, setEmailInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ flNameInput, setFLNameInput ] = useState('');

    const handleSignUp = async () => {
        const isUserQuery = query(collection(db, "users"), where("email", "==", emailInput));
        const isUserSnapshot = await getDocs(isUserQuery);
        let userExists = false;
        isUserSnapshot.forEach((doc) => {userExists = true;});
        if (userExists) {
            // sign the user back in
        } else {
            // create a new user
        }
    }

    return (
        <div className="SignUp-Container">
            <div><input placeholder="email" onChange={e => {setEmailInput(e.target.value)}} /></div>
            <div><input placeholder="password" onChange={e => {setPasswordInput(e.target.value)}} /></div>
            <div><input placeholder="First And Last Name" onChange={e => {setFLNameInput(e.target.value)}}/></div>
            <div className="Select-Chapter-Container">
                <label>
                    Your Chapter:
                    <select className="Select-Chapter">
                        <option value="Wheaton">Wheaton</option>
                    </select>
                </label>
            </div>
            <div>
                <button onClick={handleSignUp}>Sign Up!</button>
            </div>
        </div>
    );
}

function SignIn() {
    return (
        <div className="SignIn-Container">
            <div><input placeholder="email" /></div>
            <div><input placeholder="password" /></div>
        </div>
    );
}

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();


    const [ nameInput, setNameInput ] = useState('');
    const [ chapter, setChapter ] = useState('Wheaton');
    const [ warningMessage, setWarningMessage ] = useState('');

    const handleLoginGoogle = async () => {
        if (chapter === '' || setNameInput === '') {
            setWarningMessage("Please Select Your Chapter And Enter Your Name!");
            return;
        }
        let error = false;
        let userId;
        let additionalInfo;
        await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            userId = user.uid;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            additionalInfo = getAdditionalUserInfo(result);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            error = true;
        });

        if (!error) {
            if (additionalInfo.isNewUser) {
                await setDoc(doc(db, "users", userId), {
                    name: "Los Angeles",
                    state: "CA",
                    country: "USA"
                });
            }
            navigate('/');
        } else {
            setWarningMessage("There Was A Google Sign In Error")
        }
    }

    return (
        <div>
            <NavBar />
            <SignUp />
            <div>Login Here</div>
            <div>
                <input placeholder="first and last name" onChange={e => {
                    setNameInput(e.target.value);
                }} />
            </div>
            <div>
                <select value={chapter} onChange={e => {
                    setChapter(e.target.value);
                }}>
                    <option selected disabled>Choose Your Chapter</option>
                    <option value="Wheaton">Wheaton</option>
                </select>
            </div>
            <button onClick={handleLoginGoogle}>Login with Google</button>
            <div>{warningMessage}</div>
            <div>{chapter}</div>
        </div>
    );
}

export default Login;