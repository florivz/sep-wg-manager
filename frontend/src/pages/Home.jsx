import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useRoommates } from '../contexts/RoommateContext';

function Home() {
    return (
        <div>
            <Header text='WG Manager' />
            <div className="home-container">
                <div className='menu-div'>
                    <h1>Menü</h1>
                    <div className='button-list'>
                        <Link to="/cleaningplan" className="menu-link">
                            <button type="button" className="btn btn-primary btn-menu">Putzplan</button>
                        </Link>
                        <Link to="/shoppinglist" className="menu-link">
                            <button type="button" className="btn btn-primary btn-menu">Einkaufsliste</button>
                        </Link>
                        <Link to="/houseplan" className="menu-link">
                            <button type="button" className="btn btn-primary btn-menu">Haushaltsplan</button>
                        </Link>
                        <Link to="/roommanagement" className="menu-link">
                            <button type="button" className="btn btn-primary btn-menu">Mitbewohnerverwaltung</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
