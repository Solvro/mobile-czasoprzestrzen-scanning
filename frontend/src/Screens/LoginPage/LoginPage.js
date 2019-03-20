import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputField from '../../Components/Input/InputField';
import Button from '../../Components/Button/Button'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import logo from '../../assests/czasoprzestrzen_logo.png';
import theme, {spacing} from '../../theme';
// import axios from 'axios';

import "./LoginPanel.css"

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
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

  render() {
    const { classes } = this.props;

    return (
        <div>
        <Grid container spacing={spacing}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>

            <Paper>
            <form autoComplete="off" className='LoginField' >
                <img src={logo} className='LogoStart' alt="Logo" />
              <FormControl className={classes.formControl}>
              <div class='wrapper'>
                    <InputField placeholder={"Login"} rows={"1"} onChange={this.handleChangeUser}></InputField>
              </div>
              <div class='wrapper'>
                    <InputField placeholder={"Hasło"} rows={"1"} onChange={this.handleChangePassword}></InputField>
              </div>
              </FormControl>
            <div className='buttonPosition'>
              <Button onClick={this.props.login} text={"Zaloguj"} link={"/home"}></Button>
            </div>

            </form>
        </Paper>
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