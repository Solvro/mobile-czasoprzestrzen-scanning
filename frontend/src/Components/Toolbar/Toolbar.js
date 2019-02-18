import React from 'react';
import {Link} from 'react-router-dom';
import './Toolbar.css';
import classes from './Toolbar.css';
import Icon from '@material-ui/core/Icon';
import logo from '../../assests/czasoprzestrzen_logoW.png';



const toolbar = ( props ) => (
    <header className='Toolbar'>
        <div>
            <img src={logo} className='Logo' alt="Logo" />
        </div>
        <nav className='DesktopOnly'>
            <ul className='NavigationItems'>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/">Sprzęt</Link>
            </li>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/rents">Wypożyczenia</Link>
            </li>
            <li className='NavigationItem'>
                <Link className={props.active ? classes.active : null} to="/clients">Klienci</Link>
            </li>
            <li className='NavigationItem' style={{paddingBottom: '1.8em'}}>
                <Link className={props.active ? classes.active : null} to="/account"><Icon>account_box</Icon></Link>
            </li>
            </ul>
        </nav>
    </header>
);

export default toolbar;