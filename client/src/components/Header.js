import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Top chef / Vidushan CHOORIYAKUMARAN</span>
                </nav>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4 text-center">Bon appétit! :)</h1>
                        <p className="lead text-center">Trouvez rapidement les promotions sur laFourchette.com pour les restaurants étoilés Michelin 2018.</p>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;