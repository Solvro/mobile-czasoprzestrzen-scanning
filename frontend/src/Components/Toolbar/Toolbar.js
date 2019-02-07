import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import './Toolbar.css';
import classes from './Toolbar.css';
import Icon from '@material-ui/core/Icon';



const toolbar = ( props ) => (
    <header className='Toolbar'>
        <div>
           LOGO
        </div>
        <nav className='DesktopOnly'>
            <ul className='NavigationItems'>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/">Sprzęt</Link>
            </li>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/rents">Wypożycznia</Link>
            </li>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/clients">Klienci</Link>
            </li>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/account"><Icon>account_box</Icon></Link>
            </li>
            </ul>
        </nav>
    </header>
);

export default toolbar;