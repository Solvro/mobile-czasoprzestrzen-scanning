import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import logo from '../../assests/czasoprzestrzen_logo.png';

import axios from 'axios';

import "./LoginPanel.css"

const styles = theme => ({
  button: {
    display: 'block',
  },
  formControl: {
    width: '100%',
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  fabStyle:{
      marginTop: '1em',
      width: '250px',
      height: '50px'
  }
});

class LoginPage extends React.Component {
  state = {
    name: '',
    password: '',
  }

  handleChangeUser = event => {
    console.log( event.target.value);

    this.setState({ name: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    // console.log("SUBMIT");
    // event.preventDefault();

    // const user = {
    //   name: this.state.name,
    //   password: this.state.password
    // };

    // console.log(user);
    // axios.post(`http://localhost:1337/login`, { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    axios.get('http://localhost:1337/ping')
      .then(response => console.log(response))
  }


  render() {
    const { classes } = this.props;

    return (
        <div>
        <Grid container spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <form autoComplete="off" className='FormField' >
                <img src={logo} className='LogoStart' alt="Logo" />
                <FormControl className={classes.formControl}>

                    <div className='wrapper-login'>
                        {/* <div class='normalText'>LOGIN: </div> */}
                        <TextField
                        id="standard-full-width"
                        className={classes.selectEmpty}
                        placeholder="Login"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChangeUser}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                        </div>

                    <div className='wrapper-login'>
                        {/* <div class='normalText'>HASŁO: </div> */}
                        <TextField
                        id="standard-full-width"
                        className={classes.selectEmpty}
                        placeholder="Hasło"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChangePassword}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    </div>
            </FormControl>

            <div className='buttonPosition'>
            <Link to="/">
                <Fab color="primary" aria-label="Add" style={styles.fabStyle}  variant="extended" onClick={this.handleSubmit} >
                    Zaloguj
                </Fab>
            </Link>
            </div>

            </form>
        </Grid>
        <Grid item xs={3}></Grid>
    </Grid>
    </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);