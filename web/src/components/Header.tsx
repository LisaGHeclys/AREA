import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import '../scss/header.scss';

function Header({buttons}: any) {
    const [headerBackground, setHeaderBackground] = useState(true);
    const changeBackground = () => {
        if (window.scrollY > 0) setHeaderBackground(false);
        else setHeaderBackground(true);
    };
    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);
    return (
        <header className={headerBackground ? 'header' : 'header-pinned'}>
            <div className="logo">
                <Link to="/">
                    <img src={require('../assets/Logo.svg').default} alt="Logo" width="80" height="80" />
                </Link>
            </div>
            <div className="navbar">
                {buttons.map((btn: any, i: number) => (
                    <Link className="navbar-item" to={btn.path} key={i}>
                        <button className={'navbar-isNotButton  ' + (btn.isButton ? 'navbar-button' : 'navbar-isNotButton')}>
                            {btn.name}
                        </button>
                    </Link>
                ))}
            </div>
        </header>
    );
}

export default Header;
