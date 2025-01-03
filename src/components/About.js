import React from 'react';
import NavBar from './NavBar.js';

function About() {
    return (
        <div>
            <NavBar />
            <div className="About">
                <h1>About Us</h1>
                <h2>Apes Together</h2>
                <p><em>A community centered around enjoying the Planet of the Apes films through a proper liberal lens.</em></p>
                <p>
                    Hi, I'm Tim Schill, member of the Planet of the Apes Society Wheaton Chapter and co-founder of A.L.L, Ape Loving Liberals. It was on a dark Thursday evening that my colleague Ben Zimmerman and I realized that we didn't have to separate our love for the Planet of the Apes films and our love for the liberal party. We found that our lives were enriched by this holistic view of life, and we made the decision to share it with the world.
                </p>
            </div>
            <div className="About">
                <h1>About Us</h1>
                <h2>Apes Together</h2>
                <p><em>A community centered around the idea that </em></p>
            </div>
        </div>
    );
}

export default About;