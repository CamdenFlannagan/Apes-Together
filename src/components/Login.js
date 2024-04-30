import React from "react";
import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLoginGoogle = async () => {
        await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

        navigate('/');
    }

    return (
        <div>
            <NavBar />
            Login Here
            <button onClick={handleLoginGoogle}>Login with Google</button>
        </div>
    );
}

export default Login;