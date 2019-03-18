import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TypeSelect from '../SearchContainer/Selects/Select';
import Button from '../Button/Button';
import InputField from '../SearchContainer/Selects/SearchField';
import './AddForm.css';

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});

class AddForm extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off" className='FormField'>
      <div class='headText'>Dodaj nową rzecz do magazynu</div>
      <FormControl className={classes.formControl}>

        <div class='wrapper'>
          <div class='normalText'>Nazwa urządzenia: </div>
          <InputField placeholder={"Nazwa"}></InputField>
        </div>

        <div class='wrapper'>
          <TypeSelect ></TypeSelect>
        </div>

        <div class='wrapper'>
          <div class='normalText'>Maksymalny czas wypożyczenia: </div>
          <InputField placeholder={"Czas wypożyczenia"} inputprops={{
                endAdornment: <InputAdornment position="end">dni</InputAdornment>}}>
          </InputField>
        </div>
      </FormControl>

        <div className='buttonPosition'>
          <Button link={'/'} text={"Dodaj"}></Button>
        </div>
      </form>
    );
  }
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddForm);