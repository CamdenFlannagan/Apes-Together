import React from 'react';
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <div className="TopOfPage">
            <div className="LogoAndApes">
                <img className="Logo" src={require('./alllogo.png')} alt="A.L.L. Logo"/>
                <img className="Apes" src={require('./apes-background.jpg') } alt="Clip from Planet of the Apes" />
            </div>
            <div className="NavBar">
                <div className="NBLink-Container">
                    <Link className="NBLink" to="/">Home</Link>
                    <Link className="NBLink" to="/blogpage">Blog Page</Link>
                    <Link className="NBLink">About</Link>
                    <Link clasaName="NBLink">Sign In</Link>
                </div>
                <div className="NBSearch-Container">
                    <input className="NBSearch" placeholder="search ALL . . ."/>
                </div>
            </div>
        </div>
    );
}

export default NavBar;