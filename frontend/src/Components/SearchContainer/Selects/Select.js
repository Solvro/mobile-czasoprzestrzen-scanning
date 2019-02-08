import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
  button: {
    display: 'block',
  },
  formControl: {
    width: '100%',
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
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
      <form autoComplete="off" className='SearchField'>
        <FormControl className={classes.formControl}>
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
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);