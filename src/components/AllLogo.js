import React from 'react';
import { useNavigate } from 'react-router-dom';
import alllogo from './alllogo.png';

function AllLogo() {
    const navigate = useNavigate();
    return (
        <img src={require('./alllogo.png')} alt="a.l.l. logo" onClick={() => {
            navigate('/');
        }}/>
    );
}

export default AllLogo;