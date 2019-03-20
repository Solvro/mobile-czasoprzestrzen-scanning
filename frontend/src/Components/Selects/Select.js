import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import itemTypes from './itemTypes';

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
    item: '',
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
            value={this.state.item}
            chosenItem="item"
            onChange={this.handleChange('item')}>

            <option value="" disabled>
              Wybierz typ
            </option>
            {itemTypes.map((itemType,i) => <option value={i}>{itemType}</option>)}
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