import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header (props) {
    return (
        <nav class="navbar bg-body-tertiary">
            <div className="container-fluid header-div">
                <span className="navbar-brand mb-0 h1" ><Link to="/"><button type="button" className="headerBtn">{props.text}</button></Link></span>
            </div>
        </nav>
    );
}

export default Header;
