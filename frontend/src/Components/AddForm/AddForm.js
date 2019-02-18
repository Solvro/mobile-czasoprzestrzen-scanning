import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import './AddForm.css';

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
    width: 200,
  },
  selectEmpty: {
      marginTop: 0,
      width: '100%'
  }
});

class AddForm extends React.Component {
  state = {
    age: '',
    open: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off" className='FormField'>
      <div id='headText'>Dodaj nową rzecz do magazynu</div>
        <FormControl className={classes.formControl}>

        <div class='wrapper'>
        <div id='normalText'>Nazwa urządzenia: </div>
        <TextField
          id="standard-full-width"
          className={classes.selectEmpty}
          placeholder="Nazwa"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div class='wrapper'>
        <NativeSelect
            className={classes.selectEmpty}
            value={this.state.age}
            chosenItem="age"
            onChange={this.handleChange('age')}
          >
            <option value="" disabled>
            Wybierz typ
            </option>
            <option value={10}>Mikrofony</option>
            <option value={20}>Przedłużacze</option>
            <option value={30}>Głośniki</option>
          </NativeSelect>
          </div>
          <div class='wrapper'>
          <div id='normalText'>Maksymalny czas wypożyczenia: </div>
            <TextField
            id="standard-full-width"
            className={classes.selectEmpty}
            placeholder="Czas wypożyczenia"
            fullWidth
            margin="normal"
            InputProps={{
                endAdornment: <InputAdornment position="end">dni</InputAdornment>,
              }}
            InputLabelProps={{
                shrink: true,
            }}
            />
            </div>
        </FormControl>

        <div className='buttonPosition'>
        <Link to="/">
        <Fab color="primary" aria-label="Add" style={{height: 50, width: 150}}  variant="extended" onClick={() => console.log("Add button clicked!")} >
            Dodaj
        </Fab>
        </Link>
        </div>
      </form>
    );
  }
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddForm);