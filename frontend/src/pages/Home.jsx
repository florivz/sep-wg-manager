import React from 'react';
import Header from '../components/Header';

function Home() {
    return (
        <div>
            <Header text='WG Manager' />
            <div className='home-div'>
                <div className='menue-div'>
                <h1>Menü</h1>
                <div className='button-list'>
                    <button type="button" className="btn btn-outline-primary">Putzplan</button>
                    <button type="button" className="btn btn-outline-primary">Einkaufslist</button>
                    <button type="button" className="btn btn-outline-primary">Haushaltsplan</button>
                    <button type="button" className="btn btn-outline-primary">Mitbewohnerverwaltung</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
