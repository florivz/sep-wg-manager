import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header (props) {
    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1" >{props.text}</span>
            </div>
        </nav>
    );
}

export default Header;