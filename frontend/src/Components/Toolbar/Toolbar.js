import React from 'react';
import {Link} from 'react-router-dom';
import './Toolbar.css';
import logo from '../../assests/czasoprzestrzen_logoW.png';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DButton from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    buttonToolbar: {
        cursor: 'pointer',
        backgroundColor: '#224f77',
        color: 'white',
        border: 'none',
        textDecoration: 'none',
        padding: '1.8em',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#163550",
            border: '#163550'
        }
    },
  });
    class Toolbar extends React.Component{

        state = {
            open: false,
            menuList: ''
          };

          async componentDidMount() {
            this.createMenuList();
          }

          createMenuList = () => {
            let menuA = []
            menuA.push(<Link key={1} className="linkInMenu" to='/account'>
            <MenuItem>Zarządzaj kontami</MenuItem></Link>)
            menuA.push(<Link key={3} className="linkInMenu" to='/changePassword'>
            <MenuItem>Zmień hasło</MenuItem>
            </Link>)
            menuA.push(<Link key={4} className="linkInMenu" to='/login'>
            <MenuItem onClick={()=>localStorage.clear()} >Wyloguj</MenuItem>
            </Link>)
            let menu = []
            menu.push(<MenuList>{menuA}</MenuList>);
            this.setState({menuList : menu});
          }
        
          handleToggle = () => {
            this.setState(state => ({ open: !state.open }));
          };
        
          handleClose = event => {
            if (this.anchorEl.contains(event.target)) {
              return;
            }
            this.setState({ open: false });
          };

          handleOtherTableClick = () => {
            this.props.history.push('/home');
            this.handleClose();
          }
        
          render() {
            const { classes } = this.props;
            const { open } = this.state;
        
            return (
    <header className='Toolbar'>
        <div>
            <img src={logo} className='Logo' alt="Logo" />
        </div>
        <nav className='DesktopOnly'>
            <ul className='NavigationItems'>
            <li key={0} className='linkInMenu'>
                <DButton
                    className={classes.buttonToolbar}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true">
                   <Link to="/home" style={{textDecoration:'none',border: 'none'}}>Sprzęt</Link> 
                </DButton>
                
            </li>
            <li key={1} className='linkInMenu'>
                <DButton
                    className={classes.buttonToolbar}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true">
                   <Link to="/rents" style={{textDecoration:'none',border: 'none'}}>Wypożyczenia</Link> 
                </DButton>
                
            </li>
            <li key={2} className='linkInMenu'>
                <DButton
                    className={classes.buttonToolbar}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true">
                   <Link to="/clients" style={{textDecoration:'none',border: 'none'}}>Klienci</Link> 
                </DButton>
                
            </li>
            <li key={3} className='linkInMenu' >
                                
                <DButton
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    className={classes.buttonToolbar}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}>
                    Ustawienia
                </DButton>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                    {this.state.menuList}
                    </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
            </li>
            </ul>
        </nav>
    </header>
);
    }}

    export default withStyles(styles)(Toolbar);