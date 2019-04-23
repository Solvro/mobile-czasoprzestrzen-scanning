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

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      chosen: ''
    };
}




handleChange = chosen => event => {
  this.setState({ [chosen]: event.target.value });
  this.props.onChange(event);
};


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const {classes} = this.props;
    
    return (
      <div className='SearchField'>
        <FormControl className={classes.formControl}>
          <NativeSelect
            className={classes.selectEmpty}
            value={this.state.chosen}
            // onChange={this.props.onChange}
            onChange={this.handleChange('chosen')}>

            <option value='' disabled>
              Wybierz typ
            </option>
            {this.props.itemTypes.map((itemType,i) => <option key={i} value={i}>{itemType}</option>)}
          </NativeSelect>


        </FormControl>
      </div>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);