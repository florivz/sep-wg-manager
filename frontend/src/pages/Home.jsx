import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useRoommates } from '../contexts/RoommateContext';
import home_bg from '../img/home_bg.jpg';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    
const username = useAuth().user.user.username;

    return (
        <div>
            <Header text='WG Manager' />
            <div className='text-center mt-3'>
                <h1>Herzlichwillkommen {username}!</h1>
                <div className="home-container">
                    <div className="background-image"></div>
                    <div className='menu-div'>
                        <h1 className="text-center mb-4">Menü</h1>
                        <div className='button-list'>
                            <Link to="/cleaningplan" className="menu-link">
                                <button type="button" className="btn btn-primary btn-menu">Putzplan</button>
                            </Link>
                            <Link to="/shoppinglist" className="menu-link">
                                <button type="button" className="btn btn-primary btn-menu">Einkaufsliste</button>
                            </Link>
                            <Link to="/budget" className="menu-link">
                                <button type="button" className="btn btn-primary btn-menu">Haushaltsplan</button>
                            </Link>
                            <Link to="/roommanagement" className="menu-link">
                                <button type="button" className="btn btn-secondary btn-menu">Mitbewohnerverwaltung</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
