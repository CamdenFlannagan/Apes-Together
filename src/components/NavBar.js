import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../firebase.js';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../UserContext.js';

function NavBar() {
    const [ userInfo, setUserInfo ] = useState(getUserInfo());
    const userId = useAuth();
    const navigate = useNavigate();
    return (
        <div className="TopOfPage">
            <div className="LogoAndApes">
                <img className="Logo" src={require('./alllogo.png')} alt="A.L.L. Logo"/>
                <img className="Apes" src={require('./apes-background.jpg') } alt="Clip from Planet of the Apes" />
            </div>
            <div className="NavBar">
                <div className="NBLink-Container">
                    <Link className="NBLink" to="/">Home</Link>
                    <Link className="NBLink" to="/about">About</Link>
                    <Link className="NBLink">Services</Link>
                    <Link className="NBLink">FAQ</Link>
                    {userId ?
                        (<div className="LogInOrOut" onClick={() => {
                            const auth = getAuth();
                            signOut(auth).then(() => {
                              // Sign-out successful.
                              console.log("succesful sign-out");
                            }).catch((error) => {
                              // An error happened.
                              console.log("uh oh. sign-out unsuccesful");
                            });
                            window.location.reload();
                        }}>SignOut</div>) :
                        (<div className="LogInOrOut" onClick={() => {
                            navigate('/login');
                        }}>Sign In</div>)}
                </div>
                <div className="NBSearch-Container">
                    <input className="NBSearch" placeholder="search ALL . . ."/>
                </div>
            </div>
        </div>
    );
}

export default NavBar;