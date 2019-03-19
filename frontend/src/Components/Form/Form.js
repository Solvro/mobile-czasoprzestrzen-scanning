import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Button from '../Button/AddButton';
import TypeSelect from '../Selects/Select';
import InputField from '../Input/InputField';

import './AddForm.css';

const styles = theme => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});

class Form extends React.Component {

  render() {
    const {
      classes
    } = this.props;


    return (
      <Paper>
      <form autoComplete="off" className='FormField'>
      <div class='headText'>Dodaj nową rzecz do magazynu</div>
      <FormControl className={classes.formControl}>

        <div class='wrapper'>
          <div class='normalText'>Nazwa urządzenia: </div>
          <InputField placeholder={"Nazwa"} rows={"1"}></InputField>
        </div>

        <div class='wrapper'>
          <TypeSelect ></TypeSelect>
        </div>

        <div class='wrapper'>
          <div class='normalText'>Opis </div>
          <InputField placeholder={"Opis"} rows={"4"}></InputField>
        </div>

        <div class='wrapper'>
          <div class='normalText'>Maksymalny czas wypożyczenia: </div>
          <InputField placeholder={"Czas wypożyczenia"} inputprops={{
                endAdornment: <InputAdornment position="end" rows={"1"}>dni</InputAdornment>}}>
          </InputField>
        </div>
      </FormControl>

        <div className='buttonPosition'>
          <Button link={'/'} text={"Dodaj"}></Button>
        </div>
      </form>
      </Paper>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);